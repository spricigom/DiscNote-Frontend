import api from "@/plugins/api";

class AuthService {
    handleError(error, action) {
        console.error(`Error during ${action}:`, error);
        throw error;
    }

    async login(email, password) {
        try {
            const { data } = await api.post('token/', { email, password });
            return data;
        } catch (error) {
            this.handleError(error, 'login');
        }
    }

    async refresh(refreshToken) {
        try {
            const { data } = await api.post('token/refresh/', { refresh: refreshToken });
            return data;
        } catch (error) {
            this.handleError(error, 'refresh');
        }
    }

    async loginGoogle(googleToken) {
        const res = await api.post('/auth/google/', { token: googleToken });
        return res.data; 
    }

    async getUser() {
        try {
            const { data } = await api.get('usuarios/me/');
            return data;
        } catch (error) {
            this.handleError(error, 'get user');
        }
    }
}

export default new AuthService();
