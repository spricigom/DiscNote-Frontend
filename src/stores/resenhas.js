import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import resenhaService from '@/services/resenhas';

export const useResenhaStore = defineStore('resenha', () => {
    const resenhas = ref([]);
    const page = ref(1);
    const pageSize = ref(10);
    const totalPages = ref(1);
    const loading = ref(false);
    const error = ref(null);

    async function fetchResenhas() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await resenhaService.fetchResenhas();
            resenhas.value = data;
            page.value = data.page;
            pageSize.value = data.page_size;
            totalPages.value = data.total_pages;
        } catch (err) {
            error.value = err;
            console.error('Error fetching resenhas:', err);
        } finally {
            loading.value = false;
        }
    }

    async function addResenha(payload) {
        try {
            const nova = await resenhaService.create(payload);
            await fetchResenhas(page.value);
            return nova;
        } catch (err) {
            error.value = err;
            throw err;
        }
    }

    async function updateResenha(id, payload) {
        try {
            const atualizada = await resenhaService.update(id, payload);
            const index = resenhas.value.findIndex(r => r.id === id);
            if (index !== -1) resenhas.value[index] = atualizada;
            return atualizada;
        } catch (err) {
            error.value = err;
        }
    }

    async function deleteResenha(id) {
        try {
            await resenhaService.remove(id);
        } catch (err) {
            error.value = err;
        }
    }

    async function getResenhaPorMusica(musicaId) {
        try {
            return await resenhaService.getResenhaPorMusica(musicaId);
        } catch (err) {
            error.value = err;
            return { media_nota: 0, total_resenhas: 0 };
        }
    }

    function fetchResenhasPorMusica(musicaId) {
        return resenhas.value.filter(r => r.musica_id == musicaId);
    }

    return {
        resenhas,
        page,
        pageSize,
        totalPages,
        loading,
        error,
        fetchResenhas,
        addResenha,
        updateResenha,
        deleteResenha,
        fetchResenhasPorMusica,
        getResenhaPorMusica
    };
});
