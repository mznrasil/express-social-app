import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { ApiError } from "../utils/responseWrapper";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(req.method, req.url, err.name, err.message);

  if (err instanceof BadRequestError) {
    ApiError.badRequest(res, err.message);
    return;
  }

  if (err instanceof NotFoundError) {
    ApiError.notFound(res, err.message);
    return;
  }

  ApiError.internalServerError(res, err.message);
};
