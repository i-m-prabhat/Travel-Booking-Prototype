import { Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { RequestWithUser } from "../types/requestWithUser";

export const adminMiddleware = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) =>
{
    if (!req.user || req.user.role !== "admin")
    {
        throw new ApiError(403, "Access denied: Admins only");
    }
    next();
};
