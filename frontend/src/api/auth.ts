import axiosInstance from "./axiosInstance";
import type { LoginRequest, RegisterRequest, User } from "../types/auth";

// Login
export const login = async (payload: LoginRequest): Promise<any> =>
{
    const { data } = await axiosInstance.post<any>("/auth/login", payload);
    if (data.data.accessToken)
    {
        localStorage.setItem("token", data.data.accessToken);
        localStorage.setItem("user-data", JSON.stringify(data.data.user));
    }
    return data;
};

// Register
export const register = async (payload: RegisterRequest): Promise<User> =>
{
    const { data } = await axiosInstance.post<User>("/auth/register", payload);
    return data;
};

// Get current user profile
export const getProfile = async (): Promise<User> =>
{
    const { data } = await axiosInstance.get<User>("/auth/profile");
    return data;
};

// Logout
export const logout = async (): Promise<void> =>
{
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user-data");
};
