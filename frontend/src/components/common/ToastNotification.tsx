import React, { useEffect } from "react";
import
{
    BsCheckCircle,
    BsExclamationTriangle,
    BsDownload,
    BsX,
} from "react-icons/bs";

type ToastType = "success" | "error";

interface ToastNotificationProps
{
    id: string;
    type: ToastType;
    title: string;
    message: string;
    onClose: (id: string) => void;
    icon?: React.ReactNode;
    duration?: number; // auto close after ms
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
    id,
    type,
    title,
    message,
    onClose,
    icon,
    duration = 3000,
}) =>
{
    const getColor = () =>
    {
        switch (type)
        {
            case "success":
                return "#178D17"; // green
            case "error":
                return "#D7263D"; // red
            default:
                return "#2563EB"; // blue fallback
        }
    };

    const getIcon = () =>
    {
        if (icon) return icon;
        switch (type)
        {
            case "success":
                return <BsCheckCircle size={20} color={getColor()} />;
            case "error":
                return <BsExclamationTriangle size={20} color={getColor()} />;
            default:
                return <BsDownload size={20} color={getColor()} />;
        }
    };

    // Auto hide after duration
    useEffect(() =>
    {
        const timer = setTimeout(() =>
        {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    return (
        <div
            className="toast-box"
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                padding: "16px 20px",
                borderLeft: `6px solid ${getColor()}`,
                minWidth: "320px",
                maxWidth: "380px",
                position: "relative",
                animation: "slideIn 0.3s ease-out",
            }}
        >
            <div style={{ marginTop: "2px" }}>{getIcon()}</div>
            <div style={{ flex: 1 }}>
                <h6
                    style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: 600,
                        color: getColor(),
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    {title}
                </h6>
                <p
                    style={{
                        margin: "4px 0 0",
                        fontSize: "14px",
                        color: "#6B7280",
                        fontFamily: "Montserrat, sans-serif",
                    }}
                >
                    {message}
                </p>
            </div>
            <button
                onClick={() => onClose(id)}
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                }}
            >
                <BsX size={18} color="#6B7280" />
            </button>
        </div>
    );
};

export default ToastNotification;
