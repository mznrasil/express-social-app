import { z } from "zod";
import { AuthSchema } from "./auth.schema";

export const GetPostIdSchema = z.object({
  params: z.object({
    postId: z.string({
      required_error: "Post ID is required"
    })
  })
});

export const AddCommentSchema = z
  .object({
    body: z.object({
      comment: z.string({
        required_error: "Comment is required"
      })
    })
  })
  .merge(AuthSchema)
  .merge(GetPostIdSchema);
export type IAddCommentSchema = z.infer<typeof AddCommentSchema>;

export const GetCommentsSchema = z
  .object({
    query: z.object({
      limit: z.string().optional().default("10"),
      offset: z.string().optional().default("0")
    })
  })
  .merge(GetPostIdSchema);
export type IGetCommentsSchema = z.infer<typeof GetCommentsSchema>;

export const GetCommentByIdSchema = z.object({
  params: z.object({
    commentId: z.string({
      required_error: "Comment ID is required"
    }),
    postId: z.string({
      required_error: "Post ID is required"
    })
  })
});
export type IGetCommentByIdSchema = z.infer<typeof GetCommentByIdSchema>;

export const UpdateCommentByIdSchema = z
  .object({
    body: z.object({
      comment: z.string({ required_error: "Comment is required" })
    })
  })
  .merge(GetCommentByIdSchema)
  .merge(AuthSchema);
export type IUpdateCommentByIdSchema = z.infer<typeof UpdateCommentByIdSchema>;

export const DeleteCommentByIdSchema = GetCommentByIdSchema.merge(AuthSchema);
export type IDeleteCommentByIdSchema = z.infer<typeof DeleteCommentByIdSchema>;

/**
 * @openapi
 * components:
 *  schemas:
 *    AddCommentSchema:
 *      type: object
 *      properties:
 *        comment:
 *          type: string
 *    CommentSchema:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        comment:
 *          type: string
 *        postId:
 *          type: number
 *        userId:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *
 *  examples:
 *    AddCommentResponseExample:
 *      summary: Comment
 *      value:
 *        data: {
 *          id: 1,
 *          comment: "This is a comment",
 *          postId: 1,
 *          userId: 1,
 *          createdAt: "2021-09-01T00:00:00.000Z",
 *          updatedAt: "2021-09-01T00:00:00.000Z"
 *        }
 *        message: "Comment added successfully"
 *        status: 201
 *
 *    GetPostCommentsResponseExample:
 *      summary: Get Comment Example
 *      value:
 *        data: [{
 *          id: 51,
 *          comment: "This is a comment",
 *          createdAt: "2024-11-12T23:04:43.311Z",
 *          updatedAt: "2024-11-12T23:04:43.311Z",
 *          postId: 4,
 *          userId: 2
 *        }]
 *        message: "Comments fetched successfully"
 *        status: 200
 *
 *    GetCommentResponseExample:
 *      summary: Get Comment Example
 *      value:
 *        data: {
 *          id: 51,
 *          comment: "This is a comment",
 *          createdAt: "2024-11-12T23:04:43.311Z",
 *          updatedAt: "2024-11-12T23:04:43.311Z",
 *          postId: 4,
 *          userId: 2
 *        }
 *        message: "Comment fetched successfully"
 *        status: 200
 * */
