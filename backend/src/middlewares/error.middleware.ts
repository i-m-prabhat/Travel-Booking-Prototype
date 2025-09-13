import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export default function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
)
{
    console.error("🔥 Error:", err);

    if (err instanceof ApiError)
    {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    }

    return res.status(500).json({
        statusCode: 500,
        success: false,
        message: err.message || "Internal Server Error",
    });
}
