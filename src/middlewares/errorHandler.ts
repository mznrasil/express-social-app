import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError
} from "../utils/errors";
import { ApiError } from "../utils/responseWrapper";
import logger from "../logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`${req.method} ${req.url} ${err.name}, ${err.message}`);

  if (err instanceof BadRequestError) {
    ApiError.badRequest(res, err.message);
    return;
  }

  if (err instanceof NotFoundError) {
    ApiError.notFound(res, err.message);
    return;
  }

  if (err instanceof ConflictError) {
    ApiError.conflict(res, err.message);
    return;
  }

  if (err instanceof UnauthorizedError) {
    ApiError.unauthorized(res, err.message);
    return;
  }

  if (err instanceof ForbiddenError) {
    ApiError.forbidden(res, err.message);
    return;
  }

  ApiError.internalServerError(res, err.message);
};
