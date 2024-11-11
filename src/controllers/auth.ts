import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { zParse } from "../utils/zParse";
import {
  LoginUserSchema,
  RefreshTokenSchema,
  RegisterUserSchema,
  UserSchema
} from "../schemas/user.schema";
import { ApiResponse } from "../utils/responseWrapper";
import { AuthService } from "../services/auth";

const authService = new AuthService();

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { body: payload } = await zParse(req, RegisterUserSchema);
    await authService.registerUser(payload);
    ApiResponse.created(res, null, "User Registered Successfully");
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { body: payload } = await zParse(req, LoginUserSchema);
  const { tokens } = await authService.loginUser(payload);
  ApiResponse.ok(res, { tokens }, "User Logged In Successfully");
});

export const refreshUser = asyncHandler(async (req: Request, res: Response) => {
  const { body: payload } = await zParse(req, RefreshTokenSchema);
  const tokens = await authService.refreshUser(payload);
  ApiResponse.ok(res, { tokens }, "User Refreshed Successfully");
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const { user } = await zParse(req, UserSchema);
  await authService.logoutUser(user);
  ApiResponse.noContent(res);
});
