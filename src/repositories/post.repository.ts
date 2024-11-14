import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post.entity";

export interface IPostRepository extends Repository<Post> {
  findPostById(id: number): Promise<Post>;
  findAllPosts(query: {
    limit: number;
    offset: number;
    q: string;
  }): Promise<[Post[], number]>;
  findUserPosts(args: {
    userId: number;
    query: { limit: number; offset: number; q: string };
  }): Promise<[Post[], number]>;
}

export class PostRepository
  extends Repository<Post>
  implements IPostRepository
{
  private postRepository: Repository<Post>;

  constructor() {
    super(Post, AppDataSource.manager, AppDataSource.createQueryRunner());
    this.postRepository = AppDataSource.getRepository(Post);
  }

  async findPostById(id: number): Promise<Post> {
    return await this.postRepository
      .createQueryBuilder("posts")
      .innerJoinAndSelect("posts.user", "user")
      .where("posts.id = :id", { id })
      .getOne();
  }

  async findAllPosts(query: {
    limit: number;
    offset: number;
    q: string;
  }): Promise<[Post[], number]> {
    return await this.postRepository
      .createQueryBuilder("posts")
      .innerJoinAndSelect("posts.user", "user")
      .where("user.id = posts.userId")
      .where("posts.title ILIKE :q", { q: `%${query.q}%` })
      .orWhere("posts.tags @> :tag", { tag: [query.q] })
      .orderBy("posts.createdAt", "DESC")
      .skip(query.offset)
      .take(query.limit)
      .getManyAndCount();
  }

  async findUserPosts({
    userId,
    query
  }: {
    userId: number;
    query: { limit: number; offset: number; q: string };
  }): Promise<[Post[], number]> {
    return await this.postRepository
      .createQueryBuilder("posts")
      .select(["posts.id", "posts.title", "user.id", "user.username"])
      .innerJoin("posts.user", "user")
      .innerJoin("user.following", "following")
      .where("following.id = :userId", { userId })
      .orWhere("posts.title ILIKE :q", { q: `%${query.q}%` })
      .orWhere("posts.tags @> :tag", { tag: [query.q] })
      .limit(query.limit)
      .skip(query.offset)
      .getManyAndCount();
  }
}
