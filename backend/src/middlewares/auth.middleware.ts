import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";
import { RequestWithUser } from "../types/requestWithUser";

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) =>
{
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new ApiError(401, "Unauthorized");

    try
    {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error)
    {
        throw new ApiError(401, "Invalid or expired token");
    }
};
