import axios from "axios";
import conf from "../conf";


const axiosInstance = axios.create({
    baseURL: conf.apiUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use(
    (config) =>
    {
        const token = localStorage.getItem("token");
        if (token)
        {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);



axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
    {
        if (error.response?.status === 401)
        {
            console.warn("Unauthorized. Redirect to login?");
            // e.g., window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
