import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const AppLayout = () =>
{
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default AppLayout;
