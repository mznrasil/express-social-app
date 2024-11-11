import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export interface IAuthRepository extends Repository<User> {
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}

export class AuthRepository
  extends Repository<User>
  implements IAuthRepository
{
  private authRepository: Repository<User>;

  constructor() {
    super(User, AppDataSource.manager, AppDataSource.createQueryRunner());
    this.authRepository = AppDataSource.getRepository(User);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.authRepository.findOneBy({
      username
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.authRepository.findOne({
      where: { email },
      select: ["id", "username", "email", "password"]
    });
    return user;
  }
}
