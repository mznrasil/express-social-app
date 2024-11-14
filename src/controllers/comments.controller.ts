import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { zParse } from "../utils/zParse";
import {
  AddCommentSchema,
  DeleteCommentByIdSchema,
  GetCommentByIdSchema,
  GetCommentsSchema,
  UpdateCommentByIdSchema
} from "../schemas/comments.schema";
import { ApiResponse } from "../utils/responseWrapper";
import { CommentsService } from "../services/comments.service";

const commentsService = new CommentsService();

export const addComment = asyncHandler(async (req: Request, res: Response) => {
  const { body: payload, params, user } = await zParse(req, AddCommentSchema);
  const comment = await commentsService.addComment(
    params.postId,
    user.id,
    payload
  );
  ApiResponse.created(res, comment, "Comment added successfully");
});

export const getPostComments = asyncHandler(
  async (req: Request, res: Response) => {
    const { params, query } = await zParse(req, GetCommentsSchema);
    const { comments, meta } = await commentsService.getComments(
      params.postId,
      query
    );
    ApiResponse.ok(res, comments, "Comments fetched successfully", meta);
  }
);

export const getPostCommentById = asyncHandler(
  async (req: Request, res: Response) => {
    const { params } = await zParse(req, GetCommentByIdSchema);
    const comment = await commentsService.getCommentById(
      params.postId,
      params.commentId
    );
    ApiResponse.ok(res, comment, "Comment fetched successfully");
  }
);

export const updatePostCommentById = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      params,
      body: payload,
      user
    } = await zParse(req, UpdateCommentByIdSchema);
    const comment = await commentsService.updateCommentById(
      params.postId,
      params.commentId,
      payload,
      user
    );
    ApiResponse.ok(res, comment, "Comment updated successfully");
  }
);

export const deletePostCommentById = asyncHandler(
  async (req: Request, res: Response) => {
    const { params, user } = await zParse(req, DeleteCommentByIdSchema);
    await commentsService.deleteCommentById(
      params.postId,
      params.commentId,
      user
    );
    ApiResponse.noContent(res);
  }
);
