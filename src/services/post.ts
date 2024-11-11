import { Post } from "../entity/Post";
import { IPostRepository } from "../repositories/post";
import {
  ICreatePostSchema,
  IGetPostsSchema,
  IUpdatePostSchema
} from "../schemas/post.schema";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { isEmpty } from "../utils/object";
import { Pagination } from "../utils/responseWrapper";

export class PostService {
  constructor(private postRepository: IPostRepository) {}

  async createPost(payload: ICreatePostSchema["body"]): Promise<Post> {
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

    const postsPromise = this.postRepository.findAllPosts({ limit, offset, q });
    const postsCountPromise = this.postRepository.count();
    const [posts, totalPostsCount] = await Promise.all([
      postsPromise,
      postsCountPromise
    ]);

    const meta = {
      limit: Number(limit),
      page: Math.floor(Number(offset) / Number(limit)) + 1,
      total: totalPostsCount,
      totalPages: Math.ceil(totalPostsCount / Number(limit))
    };

    return { posts, meta };
  }

  async getPostById(postId: string): Promise<Post> {
    const id = parseInt(postId);
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundError({
        message: "Post not found"
      });
    }
    return post;
  }

  async updatePost(
    id: string,
    payload: IUpdatePostSchema["body"]
  ): Promise<Post> {
    const post = await this.getPostById(id);

    if (isEmpty(payload)) {
      throw new BadRequestError({
        message: "Payload is required"
      });
    }

    const postPayload = this.postRepository.create({
      ...post,
      ...payload
    });
    const updatedPost = await this.postRepository.save(postPayload);
    return updatedPost;
  }

  async deletePost(id: string) {
    const post = await this.getPostById(id);
    await this.postRepository.delete({ id: post.id });
  }
}
