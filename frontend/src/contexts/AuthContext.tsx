import { createContext, useContext, useEffect, useState } from "react";

interface User
{
    id: string;
    name: string;
    email: string;
}

interface AuthContextType
{
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) =>
{
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(
        localStorage.getItem("user-data") ? JSON.parse(localStorage.getItem("user-data")!) : null
    );

    useEffect(() =>
    {
        if (token)
        {
            localStorage.setItem("token", token);
        } else
        {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() =>
    {
        if (user)
        {
            localStorage.setItem("user-data", JSON.stringify(user));
        } else
        {
            localStorage.removeItem("user-data");
        }
    }, [user]);

    const login = (newToken: string, newUser: User) =>
    {
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () =>
    {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};