import {config} from "../config/config";
import {AuthRepository, IAuthRepository} from "../repositories/auth.repository";
import {ILoginuserSchema, IRefreshTokenSchema, IRegisterUserSchema, IUserSchema} from "../schemas/user.schema";
import {ConflictError, NotFoundError, UnauthorizedError} from "../utils/errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {TokenService} from "./token.service";
import {UserRole} from "../entity/User.entity";

export class AuthService {
  private authRepository: IAuthRepository;
  private tokenService: TokenService;

  constructor() {
    this.authRepository = new AuthRepository();
    this.tokenService = new TokenService();
  }

  async registerUser(payload: IRegisterUserSchema["body"]): Promise<void> {
    let user = await this.authRepository.findByUsername(payload.username);
    if (user) throw new ConflictError({ message: "Username already exists" });

    user = await this.authRepository.findByEmail(payload.email);
    if (user) throw new ConflictError({ message: "Email already exists" });

    const hashedPassword = bcrypt.hashSync(
      payload.password,
      bcrypt.genSaltSync(10)
    );

    const userPayload = this.authRepository.create({
      ...payload,
      password: hashedPassword
    });
    await this.authRepository.save(userPayload);
  }

  async loginUser(
    payload: ILoginuserSchema["body"]
  ): Promise<{ tokens: { accessToken: string; refreshToken: string } }> {
    const user = await this.authRepository.findByEmail(payload.email);
    if (!user) {
      throw new NotFoundError({ message: "Invalid email or password" });
    }

    const isPasswordValid = bcrypt.compareSync(payload.password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundError({ message: "Invalid email or password" });
    }

    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken(user);
    await this.tokenService.saveToken(user.id, refreshToken);

    return {
      tokens: { accessToken, refreshToken }
    };
  }

  async refreshUser(
    payload: IRefreshTokenSchema["body"]
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = jwt.verify(
      payload.refreshToken,
      config.REFRESH_TOKEN_SECRET
    ) as IUserSchema["user"];

    const existingToken = await this.tokenService.findActiveToken(
      decoded.id,
      payload.refreshToken
    );

    if (!existingToken) {
      throw new UnauthorizedError({ message: "Invalid refresh token" });
    }

    const newAccessToken = this.tokenService.generateAccessToken(decoded);
    const newRefreshTokenHash = this.tokenService.generateRefreshToken(decoded);

    await this.tokenService.updateToken(
      existingToken.id,
      decoded.id,
      newRefreshTokenHash
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshTokenHash };
  }

  async logoutUser(user: IUserSchema["user"]): Promise<void> {
    await this.tokenService.deleteTokens(user.id);
  }
}
