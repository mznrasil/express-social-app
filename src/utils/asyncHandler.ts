import { Request, Response, NextFunction } from "express";

type Fn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncHandler = (fn: Fn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
