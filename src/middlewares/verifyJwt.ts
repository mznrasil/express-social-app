import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errors";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { config } from "../config/config";
import { asyncHandler } from "../utils/asyncHandler";

export const verifyJwt = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (err: unknown) {
      if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedError({ message: err.message });
      }
    }
  }
);
