import { Request, Response } from "express";
import {
  CreatePostSchema,
  GetPostsSchema,
  UpdatePostSchema,
  GetIdSchema,
  DeletePostSchema
} from "../schemas/post.schema";
import { PostService } from "../services/post.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/responseWrapper";
import { zParse } from "../utils/zParse";

export class PostController {
  constructor(private readonly postService: PostService) {}

  createPost = asyncHandler(async (req: Request, res: Response) => {
    const { body: payload, user } = await zParse(req, CreatePostSchema);
    const post = await this.postService.createPost({
      ...payload,
      userId: user.id
    });
    ApiResponse.created(res, post, "Post Created Successfully");
  });

  getPosts = asyncHandler(async (req: Request, res: Response) => {
    const { query } = await zParse(req, GetPostsSchema);
    const { posts, meta } = await this.postService.getPosts(query);
    ApiResponse.ok(res, posts, "Posts Fetched Successfully", meta);
  });

  getPostById = asyncHandler(async (req: Request, res: Response) => {
    const { params } = await zParse(req, GetIdSchema);
    const post = await this.postService.getPostById(params.id);
    ApiResponse.ok(res, post, "Post Fetched Successfully");
  });

  updatePost = asyncHandler(async (req: Request, res: Response) => {
    const { params, body: payload, user } = await zParse(req, UpdatePostSchema);
    const post = await this.postService.updatePost(params.id, payload, user.id);
    ApiResponse.ok(res, post, "Post Updated Successfully");
  });

  deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { params, user } = await zParse(req, DeletePostSchema);
    await this.postService.deletePost(params.id, user.id);
    ApiResponse.noContent(res);
  });
}
