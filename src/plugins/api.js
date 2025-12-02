import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL || "https://discnote-backend.onrender.com/api";

const api = axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 200000,


// ====== REQUEST INTERCEPTOR ======
api.interceptors.request.use((config) => {

    // Pegamos direto do localStorage para evitar problemas com o Pinia
    const token = localStorage.getItem("access");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// ====== RESPONSE INTERCEPTOR (REFRESH TOKEN AUTOMÁTICO) ======
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // Se der 401 e ainda não tentamos refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refresh = localStorage.getItem("refresh");
            if (!refresh) return Promise.reject(error);

            try {
                // Tentamos pegar novo token
                const { data } = await axios.post(`${apiURL}/token/refresh/`, {
                    refresh,
                });

                // Salvamos o token novo
                localStorage.setItem("access", data.access);

                // Reenvia a requisição original com token novo
                originalRequest.headers.Authorization = `Bearer ${data.access}`;
                return api(originalRequest);

            } catch (err) {
                // Refresh inválido → desloga
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
            }
        }

        return Promise.reject(error);
    }
);


export default api;
