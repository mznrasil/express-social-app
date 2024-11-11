import { Response } from "express";

export class ApiResponse {
  static success(
    res: Response,
    data: any,
    message: string = "Success",
    status: number,
    meta?: Pagination
  ) {
    return res.status(status).json({
      data,
      message,
      status,
      meta
    });
  }

  static ok(
    res: Response,
    data: any,
    message: string = "Success",
    meta?: Pagination
  ) {
    return ApiResponse.success(res, data, message, 200, meta);
  }

  static created(
    res: Response,
    data: any,
    message: string = "Created Successfully"
  ) {
    return ApiResponse.success(res, data, message, 201);
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }
}

export class ApiError {
  static error(res: Response, message: string = "Error", status: number) {
    return res.status(status).json({
      message,
      status
    });
  }

  static badRequest(res: Response, message: string = "Bad Request") {
    return ApiError.error(res, message, 400);
  }

  static notFound(res: Response, message: string = "Not Found") {
    return ApiError.error(res, message, 404);
  }

  static internalServerError(
    res: Response,
    message: string = "Internal Server Error"
  ) {
    return ApiError.error(res, message, 500);
  }
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
