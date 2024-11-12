import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost
} from "../controllers/post.controller";
import { verifyJwt } from "../middlewares/verifyJwt";
import { checkRoles } from "../middlewares/checkRoles";
import { UserRole } from "../entity/User.entity";

const postRouter = Router();

/**
 * @openapi
 * /api/v1/posts:
 *  post:
 *    tags:
 *    - Posts
 *    summary: Create a new post
 *    description: Create new post with the following fields
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreatePostSchema'
 *          examples:
 *            AllFieldsExample:
 *              summary: All Fields
 *              value:
 *                title: This is a title
 *                content: This is a content
 *                tags: ["tag1", "tag2"]
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/PostSchema'
 *                message:
 *                  type: string
 *                status:
 *                  type: number
 *            examples:
 *              CreatePostResponseExample:
 *                $ref: '#/components/examples/CreatePostResponseExample'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              BadRequestErrorExample:
 *                $ref: '#/components/examples/BadRequestErrorExample'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              UnauthorizedErrorExample:
 *                $ref: '#/components/examples/UnauthorizedErrorExample'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              InternalServerErrorExample:
 *                $ref: '#/components/examples/InternalServerErrorExample'
 */
postRouter.post("/", verifyJwt, checkRoles(UserRole.USER), createPost);

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
 */
postRouter.get("/", getPosts);

/**
 * @openapi
 * /api/v1/posts/{id}:
 *  get:
 *    tags:
 *    - Posts
 *    summary: Get Post by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostSchema'
 *            examples:
 *              GetPostResponseExample:
 *                $ref: '#/components/examples/GetPostResponseExample'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              NotFoundErrorExample:
 *                $ref: '#/components/examples/NotFoundErrorExample'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              InternalServerErrorExample:
 *                $ref: '#/components/examples/InternalServerErrorExample'
 *
 *  patch:
 *    tags:
 *    - Posts
 *    summary: Update Post by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreatePostSchema'
 *          examples:
 *            AllFieldsExample:
 *              summary: All Fields
 *              value:
 *                title: This is a title
 *                content: This is a content
 *                tags: ["tag1", "tag2"]
 *            Partial Fields:
 *              summary: Partial Fields
 *              value:
 *                title: This is a title
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/PostSchema'
 *                message:
 *                  type: string
 *                status:
 *                  type: number
 *            examples:
 *              UpdatePostResponseExample:
 *                $ref: '#/components/examples/UpdatePostResponseExample'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              UnauthorizedErrorExample:
 *                $ref: '#/components/examples/UnauthorizedErrorExample'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              NotFoundErrorExample:
 *                $ref: '#/components/examples/NotFoundErrorExample'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              InternalServerErrorExample:
 *                $ref: '#/components/examples/InternalServerErrorExample'
 *
 *  delete:
 *    tags:
 *    - Posts
 *    summary: Delete Post by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *      204:
 *        description: No Content
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              NotFoundErrorExample:
 *                $ref: '#/components/examples/NotFoundErrorExample'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              UnauthorizedErrorExample:
 *                $ref: '#/components/examples/UnauthorizedErrorExample'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              InternalServerErrorExample:
 *                $ref: '#/components/examples/InternalServerErrorExample'
 *
 */
postRouter
  .route("/:id")
  .get(getPostById)
  .patch(verifyJwt, checkRoles(UserRole.USER), updatePost)
  .delete(verifyJwt, checkRoles(UserRole.ADMIN), deletePost);

export default postRouter;
