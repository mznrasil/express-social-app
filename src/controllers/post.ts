import { Request, Response } from "express";
import {
  CreatePostSchema,
  GetPostsSchema,
  UpdatePostSchema,
  GetIdSchema,
  DeletePostSchema
} from "../schemas/post.schema";
import { PostService } from "../services/post";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/responseWrapper";
import { zParse } from "../utils/zParse";

const postService = new PostService();

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { body: payload, user } = await zParse(req, CreatePostSchema);
  const post = await postService.createPost({
    ...payload,
    userId: user.id
  });
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
  const { params, body: payload, user } = await zParse(req, UpdatePostSchema);
  const post = await postService.updatePost(params.id, payload, user.id);
  ApiResponse.ok(res, post, "Post Updated Successfully");
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const { params, user } = await zParse(req, DeletePostSchema);
  await postService.deletePost(params.id, user.id);
  ApiResponse.noContent(res);
});
