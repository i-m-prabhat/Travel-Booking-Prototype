export interface User
{
    id: string;
    name: string;
    email: string;
}

export interface LoginRequest
{
    email: string;
    password: string;
}

export interface LoginResponse
{
    token(arg0: string, token: any): unknown;
    accessToken: string;
    user: User;
}

export interface RegisterRequest
{
    name: string;
    email: string;
    password: string;
}
