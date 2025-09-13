import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { AuthPayload } from "types/auth";

export const signToken = (
    payload: AuthPayload,
    expiresIn: string | number = "1d"
): string =>
{
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: (process.env.JWT_EXPIRES_IN as string | number) || expiresIn } as SignOptions
    );
};

export const verifyToken = (token: string): AuthPayload =>
{
    return jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
};
