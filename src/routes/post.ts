import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost
} from "../controllers/post";
import { verifyJwt } from "../middlewares/verifyJwt";

const postRouter = Router();

postRouter.post("/", verifyJwt, createPost);

/**
 * @openapi
 * /api/v1/posts:
 *  get:
 *    tags:
 *      - Posts
 *    summary: Get all posts
 *    description: Get all posts with pagination and search
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
 *        description: A list of posts
 */
postRouter.get("/", getPosts);

/**
 * @openapi
 * /api/v1/posts/{id}:
 * get:
 *  tag:
 *    - Posts
 */
postRouter
  .route("/:id")
  .get(getPostById)
  .patch(verifyJwt, updatePost)
  .delete(verifyJwt, deletePost);

export default postRouter;
