import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:19003/api";

const api = axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const auth = useAuthStore();
    if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const auth = useAuthStore();

        if (error.response?.status === 401 && auth.refresh) {
            try {
                await auth.refreshToken();

                error.config.headers.Authorization = `Bearer ${auth.token}`;
                return api.request(error.config);
            } catch (err) {
                auth.logout();
            }
        }
        return Promise.reject(error);
    }
);


export default api;