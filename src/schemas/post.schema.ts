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
