import { Comment } from "../entity/Comment.entity";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export interface ICommentsRepository extends Repository<Comment> {
  findPostComments(
    postId: number,
    limit: number,
    offset: number
  ): Promise<[Comment[], number]>;
}

export class CommentRepository
  extends Repository<Comment>
  implements ICommentsRepository
{
  private commentsRepository: Repository<Comment>;

  constructor() {
    super(Comment, AppDataSource.manager, AppDataSource.createQueryRunner());
    this.commentsRepository = AppDataSource.getRepository(Comment);
  }

  async findPostComments(
    postId: number,
    limit: number,
    offset: number
  ): Promise<[Comment[], number]> {
    const [comments, commentsCount] =
      await this.commentsRepository.findAndCount({
        where: { postId },
        take: limit,
        skip: offset,
        order: { createdAt: "desc" }
      });
    return [comments, commentsCount];
  }
}
