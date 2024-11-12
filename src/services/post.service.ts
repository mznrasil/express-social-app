import { Post } from "../entity/Post.entity";
import { IPostRepository, PostRepository } from "../repositories/post.repository";
import { IGetPostsSchema, IUpdatePostSchema } from "../schemas/post.schema";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from "../utils/errors";
import { isEmpty } from "../utils/object";
import { Pagination } from "../utils/responseWrapper";

export class PostService {
  private postRepository: IPostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(payload: Partial<Post>): Promise<Post> {
    const postPayload = this.postRepository.create(payload);
    const post = await this.postRepository.save(postPayload);
    return post;
  }

  async getPosts(
    query: IGetPostsSchema["query"]
  ): Promise<{ posts: Post[]; meta: Pagination }> {
    const limit = parseInt(query.limit);
    const offset = parseInt(query.offset);
    const q = query.q;

    const [posts, count] = await this.postRepository.findAllPosts({
      limit,
      offset,
      q
    });

    const meta = {
      limit: Number(limit),
      page: Math.floor(Number(offset) / Number(limit)) + 1,
      total: count,
      totalPages: Math.ceil(count / Number(limit))
    };

    return { posts, meta };
  }

  async getPostById(postId: string): Promise<Post> {
    const id = parseInt(postId);
    const post = await this.postRepository.findPostById(id);
    if (!post) {
      throw new NotFoundError({
        message: "Post not found"
      });
    }
    return post;
  }

  async updatePost(
    id: string,
    payload: IUpdatePostSchema["body"],
    userId: number
  ): Promise<Post> {
    const post = await this.getPostById(id);

    if (isEmpty(payload)) {
      throw new BadRequestError({
        message: "Payload is required"
      });
    }

    if (post.userId !== userId) {
      throw new UnauthorizedError({
        message: "You are not allowed to update this post"
      });
    }

    const postPayload = this.postRepository.create({
      ...post,
      ...payload
    });
    const updatedPost = await this.postRepository.save(postPayload);
    return updatedPost;
  }

  async deletePost(id: string, userId: number) {
    const post = await this.getPostById(id);
    if (post.userId !== userId) {
      throw new UnauthorizedError({
        message: "You are not allowed to delete this post."
      });
    }
    await this.postRepository.delete({ id: post.id });
  }
}
