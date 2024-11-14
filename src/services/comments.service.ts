import {
  CommentRepository,
  ICommentsRepository
} from "../repositories/comments.repository";
import {
  IAddCommentSchema,
  IDeleteCommentByIdSchema,
  IGetCommentsSchema,
  IUpdateCommentByIdSchema
} from "../schemas/comments.schema";
import { Comment } from "../entity/Comment.entity";
import { Pagination } from "../utils/responseWrapper";
import { NotFoundError, UnauthorizedError } from "../utils/errors";

export class CommentsService {
  private commentsRepository: ICommentsRepository;

  constructor() {
    this.commentsRepository = new CommentRepository();
  }

  async addComment(
    postId: string,
    userId: number,
    payload: IAddCommentSchema["body"]
  ): Promise<Comment> {
    const commentPayload = this.commentsRepository.create(payload);
    commentPayload.postId = parseInt(postId);
    commentPayload.userId = userId;
    const comment = await this.commentsRepository.save(commentPayload);
    return comment;
  }

  async getComments(
    postId: string,
    query: IGetCommentsSchema["query"]
  ): Promise<{ comments: Comment[]; meta: Pagination }> {
    const [comments, count] = await this.commentsRepository.findPostComments(
      parseInt(postId),
      parseInt(query.limit),
      parseInt(query.offset)
    );

    const meta = {
      limit: Number(query.limit),
      page: Math.floor(Number(query.offset) / Number(query.limit)) + 1,
      total: count,
      totalPages: Math.ceil(count / Number(query.limit))
    } satisfies Pagination;

    return { comments, meta };
  }

  async getCommentById(postId: string, commentId: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { postId: parseInt(postId), id: parseInt(commentId) }
    });
    if (!comment) {
      throw new NotFoundError({ message: "Comment not found" });
    }
    return comment;
  }

  async updateCommentById(
    postId: string,
    commentId: string,
    payload: IUpdateCommentByIdSchema["body"],
    user: IUpdateCommentByIdSchema["user"]
  ): Promise<Comment> {
    const foundComment = await this.getCommentById(postId, commentId);
    if (user.id !== foundComment.userId) {
      throw new UnauthorizedError({
        message: "You are not allowed to update this comment "
      });
    }

    const comment = await this.commentsRepository.save({
      ...foundComment,
      ...payload
    });
    return comment;
  }

  async deleteCommentById(
    postId: string,
    commentId: string,
    user: IDeleteCommentByIdSchema["user"]
  ) {
    const foundComment = await this.getCommentById(postId, commentId);
    if (user.id !== foundComment.userId) {
      throw new UnauthorizedError({
        message: "You are not allowed to update this comment "
      });
    }

    await this.commentsRepository.delete({
      id: parseInt(commentId)
    });
  }
}
