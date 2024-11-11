import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

export interface IPostRepository extends Repository<Post> {
  findAllPosts(query: {
    limit: number;
    offset: number;
    q: string;
  }): Promise<Post[]>;
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

  async findAllPosts(query: {
    limit: number;
    offset: number;
    q: string;
  }): Promise<Post[]> {
    return await this.postRepository
      .createQueryBuilder("posts")
      .innerJoinAndSelect("posts.user", "user")
      .where("user.id = posts.userId")
      .where("posts.title ILIKE :q", { q: `%${query.q}%` })
      .orWhere("posts.tags @> :tag", { tag: [query.q] })
      .orderBy("posts.createdAt", "DESC")
      .skip(query.offset)
      .take(query.limit)
      .getMany();
  }
}
