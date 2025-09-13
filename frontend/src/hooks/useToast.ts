import { useToastContext } from "../components/common/ToastProvider";

export const useToast = () =>
{
    const { showToast } = useToastContext();

    return {
        success: (title: string, message: string) => showToast("success", title, message),
        error: (title: string, message: string) => showToast("error", title, message),
    };
};
