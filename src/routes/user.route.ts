import { Router } from "express";
import {
  followUser,
  getFollowers,
  getFollowing,
  getUserFeed,
  unfollowUser
} from "../controllers/users.controller";
import { verifyJwt } from "../middlewares/verifyJwt";
import { checkRoles } from "../middlewares/checkRoles";
import { UserRole } from "../entity/User.entity";

const userRouter = Router();

/**
 * @openapi
 * /api/v1/users/{followedUserId}/follow:
 *  put:
 *    tags:
 *    - Users
 *    summary: Follow a user
 *    parameters:
 *      - in: path
 *        name: followedUserId
 *        required: true
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: null
 *                message:
 *                  type: string
 *                status:
 *                  type: number
 *
 * /api/v1/users/{unfollowedUserId}/unfollow:
 *  put:
 *    tags:
 *    - Users
 *    summary: Unfollow a user
 *    parameters:
 *      - in: path
 *        name: unfollowedUserId
 *        required: true
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: null
 *                message:
 *                  type: string
 *                status:
 *                  type: number
 *
 * /api/v1/users/followers:
 *  get:
 *    tags:
 *    - Users
 *    summary: Get Followers
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UserSchema'
 *                message:
 *                  type: string
 *                status:
 *                  type: number
 *
 * /api/v1/users/following:
 *  get:
 *    tags:
 *    - Users
 *    summary: Get Users whom you are following
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UserSchema'
 *                message:
 *                  type: string
 *                status:
 *                  type: number
 *
 * /api/v1/users/feed:
 *  get:
 *    tags:
 *      - Users
 *    summary: Get user feed
 *    description: Get all posts according to the user's followers
 *    produces: application/json
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          minimum: 1
 *          default: 10
 *        required: false
 *        description: Limit the number of posts
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *          minimum: 0
 *          default: 0
 *          required: false
 *        description: Offset the number of posts
 *      - in: query
 *        name: q
 *        required: false
 *        schema:
 *          type: string
 *        description: Search the post by title or tags(must be exact match)
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetPostsResponseSchema'
 *            examples:
 *             GetPostsResponseExample:
 *              $ref: '#/components/examples/GetPostsResponseExample'
 *             EmptyResponseExample:
 *              $ref: '#/components/examples/EmptyResponseExample'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *             InternalServerErrorExample:
 *              $ref: '#/components/examples/InternalServerErrorExample'
 * */
userRouter.put(
  "/:followedUserId/follow",
  verifyJwt,
  checkRoles(UserRole.USER),
  followUser
);
userRouter.put(
  "/:unfollowedUserId/unfollow",
  verifyJwt,
  checkRoles(UserRole.USER),
  unfollowUser
);

userRouter.get(
  "/followers",
  verifyJwt,
  checkRoles(UserRole.USER),
  getFollowers
);
userRouter.get(
  "/following",
  verifyJwt,
  checkRoles(UserRole.USER),
  getFollowing
);
userRouter.get("/feed", verifyJwt, checkRoles(UserRole.USER), getUserFeed);

export default userRouter;
