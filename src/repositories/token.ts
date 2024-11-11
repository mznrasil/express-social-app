import { Repository } from "typeorm";
import { Token } from "../entity/Token";
import { AppDataSource } from "../data-source";

export interface ITokenRepository extends Repository<Token> {
  deleteManyByUserId(userId: number): Promise<void>;
}

export class TokenRepository
  extends Repository<Token>
  implements ITokenRepository
{
  private tokenRepository: Repository<Token>;

  constructor() {
    super(Token, AppDataSource.manager, AppDataSource.createQueryRunner());
    this.tokenRepository = AppDataSource.getRepository(Token);
  }

  async deleteManyByUserId(userId: number): Promise<void> {
    await this.tokenRepository
      .createQueryBuilder()
      .delete()
      .from(Token)
      .where("user_id = :userId", { userId: userId })
      .execute();
  }
}
