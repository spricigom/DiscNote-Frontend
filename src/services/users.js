import api from "@/plugins/api";

export default new class UsersService {
    handleError(error, action) {
        console.error(`Error during ${action}:`, error)
        throw error;
    }

    async create(name, email, username, password) {
        try {
            const { data } = await api.post('usuarios/', { name, email, username, password });
            return data;
        } catch (error) {
            this.handleError(error, 'create user');
        }
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