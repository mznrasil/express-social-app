import { NextFunction, Request, Response } from "express";
import logger from "../logger";

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path} ${res.statusCode}`);
  next();
};
