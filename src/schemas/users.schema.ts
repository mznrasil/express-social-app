import { z } from "zod";
import { AuthSchema } from "./auth.schema";

export const FollowUserSchema = z
  .object({
    params: z.object({
      followedUserId: z.string({
        required_error: "Followed User ID is required"
      })
    })
  })
  .merge(AuthSchema);

export const UnfollowUserSchema = z
  .object({
    params: z.object({
      unfollowedUserId: z.string({
        required_error: "Unfollowed User ID is required"
      })
    })
  })
  .merge(AuthSchema);
