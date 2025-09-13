import React, { createContext, useContext, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import ToastNotification from "./ToastNotification";

type ToastType = "success" | "error";

interface Toast
{
    id: string;
    type: ToastType;
    title: string;
    message: string;
    icon?: React.ReactNode;
}

interface ToastContextType
{
    showToast: (type: ToastType, title: string, message: string, icon?: React.ReactNode) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (type: ToastType, title: string, message: string, icon?: React.ReactNode) =>
    {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, type, title, message, icon }]);
    };

    const removeToast = (id: string) =>
    {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer position="top-end" className="p-3">
                {toasts.map((toast) => (
                    <ToastNotification key={toast.id} {...toast} onClose={removeToast} />
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
};

export const useToastContext = () =>
{
    const context = useContext(ToastContext);
    if (!context)
    {
        throw new Error("useToastContext must be used within ToastProvider");
    }
    return context;
};
