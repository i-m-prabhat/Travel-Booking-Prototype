import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const signToken = (
    payload: object,
    expiresIn: string | number = "1d"
): string =>
{
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: (process.env.JWT_EXPIRES_IN as string | number) || expiresIn } as SignOptions
    );
};

export const verifyToken = (token: string): string | JwtPayload =>
{
    return jwt.verify(token, process.env.JWT_SECRET as string);
};
