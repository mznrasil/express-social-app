import { asyncHandler } from "../utils/asyncHandler";
import { zParse } from "../utils/zParse";
import { FollowUserSchema, UnfollowUserSchema } from "../schemas/users.schema";
import { UserService } from "../services/user.service";
import { ApiResponse } from "../utils/responseWrapper";
import { AuthSchema } from "../schemas/auth.schema";

const userService = new UserService();

export const followUser = asyncHandler(async (req, res) => {
  const { user, params } = await zParse(req, FollowUserSchema);
  await userService.followUser(user.id, params.followedUserId);
  ApiResponse.ok(res, null, "User followed");
});

export const unfollowUser = asyncHandler(async (req, res) => {
  const { user, params } = await zParse(req, UnfollowUserSchema);
  await userService.unfollowUser(user.id, params.unfollowedUserId);
  ApiResponse.ok(res, null, "User unfollowed");
});

export const getFollowers = asyncHandler(async (req, res) => {
  const { user } = await zParse(req, AuthSchema);
  const followers = await userService.getFollowers(user.id);
  ApiResponse.ok(res, followers);
});

export const getFollowing = asyncHandler(async (req, res) => {
  const { user } = await zParse(req, AuthSchema);
  const followings = await userService.getFollowing(user.id);
  ApiResponse.ok(res, followings);
});

export const getUserFeed = asyncHandler(async (req, res) => {
  const { user } = await zParse(req, AuthSchema);
  const { posts, meta } = await userService.getFeed(user.id);
  ApiResponse.ok(res, posts, "User feed fetched successfully", meta);
});
