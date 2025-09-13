import { Types } from "mongoose";

export interface AuthPayload
{
    id: string | Types.ObjectId;
    email: string;
    role: "user" | "admin";
}
