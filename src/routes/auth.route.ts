import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser
} from "../controllers/auth.controller";
import { verifyJwt } from "../middlewares/verifyJwt";

const authRouter = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *  post:
 *    tags:
 *    - User
 *    summary: Register
 *    description: Register user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterUserSchema'
 *    responses:
 *      201:
 *        description: Created
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
 *            examples:
 *              RegisterUserResponseExample:
 *                $ref: '#/components/examples/RegisterUserResponseExample'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              BadRequestErrorExample:
 *                $ref: '#/components/examples/BadRequestErrorExample'
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              ConflictErrorExample:
 *                $ref: '#/components/examples/ConflictErrorExample'
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
authRouter.post("/register", registerUser);

/**
 * @openapi
 * /api/v1/auth/login:
 *  post:
 *    tags:
 *    - User
 *    summary: Login
 *    description: Login user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginUserSchema'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/TokensSchema'
 *                message:
 *                  type: string
 *                status:
 *                  type: number
 *            examples:
 *              TokenCreatedExample:
 *                $ref: '#/components/examples/TokenCreatedExample'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorSchema'
 *            examples:
 *              BadRequestErrorExample:
 *                $ref: '#/components/examples/BadRequestErrorExample'
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
authRouter.post("/login", loginUser);

/**
 * @openapi
 * /api/v1/auth/refresh:
 *  post:
 *    tags:
 *    - User
 *    summary: Refresh Token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RefreshUserSchema'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/TokensSchema'
 *                message:
 *                  type: string
 *                status:
 *                  type: number
 *            examples:
 *              TokenCreatedExample:
 *                $ref: '#/components/examples/TokenCreatedExample'
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
authRouter.post("/refresh", refreshUser);

/**
 * @openapi
 * /api/v1/auth/logout:
 *  post:
 *    tags:
 *    - User
 *    summary: Logout User
 *    responses:
 *      204:
 *        description: No Content
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
authRouter.post("/logout", verifyJwt, logoutUser);

export default authRouter;
