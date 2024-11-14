import { DataSource, Repository } from "typeorm";
import { User } from "../entity/User.entity";
import { AppDataSource } from "../data-source";

export interface IUserRepository extends Repository<User> {
  followUser(userId: number, followedUserId: number): Promise<void>;
  unfollowUser(userId: number, unfollowedUserId: number): Promise<void>;
  getFollowers(userId: number): Promise<User[]>;
  getFollowing(userId: number): Promise<User[]>;
}

export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  private dataSource: DataSource;
  private userRepository: Repository<User>;

  constructor() {
    super(User, AppDataSource.manager, AppDataSource.createQueryRunner());
    this.dataSource = AppDataSource;
    this.userRepository = AppDataSource.getRepository(User);
  }

  async followUser(userId: number, followedUserId: number): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .relation(User, "followers")
      .of(userId)
      .add(followedUserId);
  }

  async unfollowUser(userId: number, unfollowedUserId: number): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .relation(User, "followers")
      .of(userId)
      .remove(unfollowedUserId);
  }

  async getFollowers(userId: number): Promise<User[]> {
    return this.dataSource
      .createQueryBuilder()
      .relation(User, "following")
      .of(userId)
      .loadMany();
  }

  async getFollowing(userId: number): Promise<User[]> {
    return this.dataSource
      .createQueryBuilder()
      .relation(User, "followers")
      .of(userId)
      .loadMany();
  }
}
