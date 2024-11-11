import { config } from "../config/config";
import { AppDataSource } from "../data-source";
import { Token, TokenStatus } from "../entity/Token";
import { ITokenRepository, TokenRepository } from "../repositories/token";
import jwt from "jsonwebtoken";

export class TokenService {
  private tokenRepository: ITokenRepository;

  constructor() {
    this.tokenRepository = new TokenRepository();
  }

  generateAccessToken(userId: number) {
    const accessToken = jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m"
    });
    return accessToken;
  }

  generateRefreshToken(userId: number) {
    const refreshToken = jwt.sign({ id: userId }, config.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d"
    });
    return refreshToken;
  }

  async findActiveToken(userId: number, refreshToken: string) {
    const existingToken = await this.tokenRepository.findOne({
      where: {
        refreshToken: refreshToken,
        userId: userId,
        status: TokenStatus.ACTIVE
      }
    });
    return existingToken;
  }

  async updateToken(tokenId: number, userId: number, newRefreshToken: string) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.update(Token, tokenId, {
      status: TokenStatus.USED
    });
    const refreshToken = queryRunner.manager.create(Token, {
      refreshToken: newRefreshToken,
      userId: userId,
      status: TokenStatus.ACTIVE,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });
    await queryRunner.manager.save(refreshToken);

    await queryRunner.commitTransaction();
  }

  async saveToken(userId: number, refreshToken: string) {
    await this.tokenRepository.save({
      userId: userId,
      refreshToken: refreshToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });
  }

  async deleteTokens(userId: number) {
    await this.tokenRepository.deleteManyByUserId(userId);
  }
}