import { Request, Response } from "express";
import { PostRepository } from "../repositories/post";
import {
  CreatePostSchema,
  GetPostsSchema,
  UpdatePostSchema,
  GetIdSchema
} from "../schemas/post.schema";
import { PostService } from "../services/post";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/responseWrapper";
import { zParse } from "../utils/zParse";

const postRepository = new PostRepository();
const postService = new PostService(postRepository);

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { body: payload } = await zParse(req, CreatePostSchema);
  const post = await postService.createPost(payload);
  ApiResponse.created(res, post, "Post Created Successfully");
});

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const { query } = await zParse(req, GetPostsSchema);
  const { posts, meta } = await postService.getPosts(query);
  ApiResponse.ok(res, posts, "Posts Fetched Successfully", meta);
});

export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const { params } = await zParse(req, GetIdSchema);
  const post = await postService.getPostById(params.id);
  ApiResponse.ok(res, post, "Post Fetched Successfully");
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { params, body: payload } = await zParse(req, UpdatePostSchema);
  const post = await postService.updatePost(params.id, payload);
  ApiResponse.ok(res, post, "Post Updated Successfully");
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const { params } = await zParse(req, GetIdSchema);
  await postService.deletePost(params.id);
  ApiResponse.noContent(res);
});
