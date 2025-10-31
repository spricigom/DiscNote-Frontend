import api from '@/plugins/api';

export default new class ResenhaService {
    async fetchResenhas(musica_id = null) {
        const data = await api.get('/resenhas', musica_id ? {
            params: { musica_id }
        } : {});
        return data;
    }

    async getById(id) {
        const { data } = await api.get(`/resenhas/${id}`);
        return data;
    }

    async create(payload) {
        try {
            const { data } = await api.post('/resenhas/', payload);
            return data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(Object.values(error.response.data).flat().join(' '));
            } else {
                throw new Error('Erro ao criar resenha.');
            }
        }
    }

    async update(id, payload) {
        const { data } = await api.put(`/resenhas/${id}`, payload);
        return data;
    }

    async remove(id) {
        await api.delete(`/resenhas/${id}/`);
        return id;
    }

    async getResenhaPorMusica(musicaId) {
        return api.get(`/resenhas/musica/${musicaId}/`).then(r => r.data);
    }
};
