import { z } from "zod";
import { UserSchema } from "./user.schema";

export const CreatePostSchema = z
  .object({
    body: z.object({
      title: z
        .string({ required_error: "Title is required" })
        .max(255, "Title must not exceed 255 charactesr"),
      content: z.string().max(1000, "Content must not exceed 1000 characters"),
      tags: z.array(z.string()).optional()
    })
  })
  .merge(UserSchema);
export type ICreatePostSchema = z.infer<typeof CreatePostSchema>;

export const UpdatePostSchema = z
  .object({
    params: z.object({
      id: z.string({
        required_error: "Post ID is required"
      })
    }),
    body: z.object({
      title: z
        .string()
        .max(255, "Title must not exceed 255 characters")
        .optional(),
      content: z
        .string()
        .max(1000, "Content must not exceed 1000 characters")
        .optional(),
      tags: z.array(z.string()).optional()
    })
  })
  .merge(UserSchema);
export type IUpdatePostSchema = z.infer<typeof UpdatePostSchema>;

export const GetPostsSchema = z.object({
  query: z.object({
    offset: z.string().optional().default("0"),
    limit: z.string().optional().default("10"),
    q: z.string().optional().default("")
  })
});
export type IGetPostsSchema = z.infer<typeof GetPostsSchema>;

export const GetIdSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Post ID is required"
    })
  })
});
export type IGetIdSchema = z.infer<typeof GetIdSchema>;

export const DeletePostSchema = GetIdSchema.merge(UserSchema);
export type IDeletePostSchema = z.infer<typeof DeletePostSchema>;

/**
 * @openapi
 * components:
 *   schemas:
 *    GetPostsResponseSchema:
 *      type: object
 *      properties:
 *        data:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/PostSchema'
 *        message:
 *          type: string
 *        status:
 *          type: number
 *        meta:
 *          type: object
 *          properties:
 *            limit:
 *              type: number
 *            page:
 *              type: number
 *            total:
 *              type: number
 *            totalPages:
 *              type: number
 *    PostSchema:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        tags:
 *          type: array
 *          items:
 *            type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        userId:
 *          type: number
 *        user:
 *          $ref: '#/components/schemas/UserSchema'
 *    CreatePostSchema:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        tags:
 *          type: string[]
 *   examples:
 *    GetPostsResponseExample:
 *      summary: Posts
 *      value:
 *        data: [
 *          {
 *            id: 1,
 *            title: "First Post",
 *            content: "This is the content of the first post",
 *            createdAt: "2024-03-15T10:00:00Z",
 *            updatedAt: "2024-03-15T10:00:00Z",
 *            userId: 1,
 *            user: {
 *               id: 1,
 *               username: "mznrasil",
 *               email: "mzn.rasil@gmail.com",
 *               createdAt: "2024-11-11T01:02:42.726Z",
 *               updatedAt: "2024-11-11T01:02:42.726Z"
 *           }
 *          }
 *        ]
 *        message: "Posts retrieved successfully"
 *        status: 200
 *        meta:
 *          limit: 10
 *          page: 1
 *          total: 25
 *          totalPages: 3
 *    EmptyResponseExample:
 *      summary: No Posts
 *      value:
 *        data: []
 *        message: "Posts retrieved successfully"
 *        status: 200
 *        meta:
 *          limit: 10
 *          page: 1
 *          total: 0
 *          totalPages: 1
 *    CreatePostResponseExample:
 *      summary: Create Post
 *      value:
 *        data: {
 *            id: 1,
 *            title: "First Post",
 *            content: "This is the content of the first post",
 *            createdAt: "2024-03-15T10:00:00Z",
 *            updatedAt: "2024-03-15T10:00:00Z",
 *            userId: 1,
 *            user: {
 *               id: 1,
 *               username: "mznrasil",
 *               email: "mzn.rasil@gmail.com",
 *               createdAt: "2024-11-11T01:02:42.726Z",
 *               updatedAt: "2024-11-11T01:02:42.726Z"
 *            }
 *        }
 *        message: "Post created successfully"
 *        status: 201
 *    UpdatePostResponseExample:
 *      summary: Update Post
 *      value:
 *        data: {
 *            id: 1,
 *            title: "First Post",
 *            content: "This is the content of the first post",
 *            createdAt: "2024-03-15T10:00:00Z",
 *            updatedAt: "2024-03-15T10:00:00Z",
 *            userId: 1,
 *            user: {
 *               id: 1,
 *               username: "mznrasil",
 *               email: "mzn.rasil@gmail.com",
 *               createdAt: "2024-11-11T01:02:42.726Z",
 *               updatedAt: "2024-11-11T01:02:42.726Z"
 *            }
 *        }
 *        message: "Post updated successfully"
 *        status: 200
 *    GetPostResponseExample:
 *      summary: Post
 *      value:
 *        data: {
 *            id: 1,
 *            title: "First Post",
 *            content: "This is the content of the first post",
 *            createdAt: "2024-03-15T10:00:00Z",
 *            updatedAt: "2024-03-15T10:00:00Z",
 *            userId: 1,
 *            user: {
 *               id: 1,
 *               username: "mznrasil",
 *               email: "mzn.rasil@gmail.com",
 *               createdAt: "2024-11-11T01:02:42.726Z",
 *               updatedAt: "2024-11-11T01:02:42.726Z"
 *            }
 *        }
 *        message: "Post fetched successfully"
 *        status: 200
 */
