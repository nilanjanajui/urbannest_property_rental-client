import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    try {
        const stored = typeof window !== "undefined"
            ? sessionStorage.getItem("auth_token")
            : null;
        if (stored) {
            config.headers.Authorization = `Bearer ${stored}`;
        }
    } catch {
        // proceed without token
    }
    return config;
});

export default axiosInstance;