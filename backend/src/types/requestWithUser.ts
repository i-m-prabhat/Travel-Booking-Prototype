import { Request } from "express";
import { AuthPayload } from "./auth";

export interface RequestWithUser extends Request
{
    user?: AuthPayload;
}
