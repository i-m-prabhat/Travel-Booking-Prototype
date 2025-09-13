import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginLayout = () =>
{
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) return <Navigate to="/" replace />;
    return <Outlet />;
};
export default LoginLayout;