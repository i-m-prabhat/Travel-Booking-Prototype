import { Request, Response, NextFunction } from "express";

export default function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
)
{
    console.error(err);
    res.status(err.status || 500).json({
        status: err.status || 500,
        success: false,
        message: err.message || "Internal Server Error",
    });
}
