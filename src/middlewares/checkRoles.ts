import {UserRole} from "../entity/User.entity";
import {NextFunction, Request, Response} from "express";
import {asyncHandler} from "../utils/asyncHandler";
import {UnauthorizedError} from "../utils/errors";
import {IUserSchema} from "../schemas/user.schema";

const isReqUser = (user: Request["user"]): user is IUserSchema["user"] => {
    return (user && typeof user === "object" && ["roles", "id", "iat", "exp"].every(key => key in user));
}

export const checkRoles = (...roles: UserRole[]) => {
    return asyncHandler((req: Request, _: Response, next: NextFunction) => {
        if (!isReqUser(req.user)) {
            throw new UnauthorizedError({
                message: "Roles not specified"
            })
        }

        if (!req?.user?.roles) {
            throw new UnauthorizedError({
                message: "Please Login first"
            })
        }
        const hasValidRoles = req.user.roles.every(role => roles.includes(role))
        if (!hasValidRoles) {
            throw new UnauthorizedError({
                message: "Not allowed"
            })
        }

        next();
    });
}