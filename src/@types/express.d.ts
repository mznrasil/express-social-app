import {IUserSchema} from "../schemas/user.schema";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user?: IUserSchema["user"] | string | jwt.JwtPayload;
    }
  }
}

export {};
