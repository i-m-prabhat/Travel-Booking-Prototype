import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { signToken } from "../utils/jwt";
import { asyncHandler } from "utils/asyncHandler";
import { ApiError } from "utils/ApiError";
import { ApiResponse } from "utils/ApiResponse";

export const register = asyncHandler(async (req: Request, res: Response) =>
{
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(400, "User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            { id: user._id, name: user.name, email: user.email },
            "User registered successfully"
        ));
});

export const login = asyncHandler(async (req: Request, res: Response) =>
{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(400, "Invalid credentials");

    const token = signToken({ id: user._id.toString(), email: user.email, role: user.role });

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { accessToken: token, user: { id: user._id, name: user.name, email: user.email, role: user.role } },
            "Login successful"
        ));
});
