import axios from "axios";
import { authClient } from "./auth-client";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(async (config) => {
    try {
        const stored = typeof window !== "undefined"
            ? sessionStorage.getItem("auth_token")
            : null;

        if (stored) {
            config.headers.Authorization = `Bearer ${stored}`;
        } else {
            const { data } = await authClient.getJwt();
            if (data?.token) {
                sessionStorage.setItem("auth_token", data.token);
                config.headers.Authorization = `Bearer ${data.token}`;
            }
        }
    } catch {
        // no active session, proceed without token
    }
    return config;
});

export default axiosInstance;