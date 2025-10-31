import { defineStore } from 'pinia'
import { ref } from 'vue'
import resenhaService from '@/services/resenhas'

export const useResenhaStore = defineStore('resenha', () => {
  const resenhas = ref([])
  const loading = ref(false)
  const error = ref(null)

  // 🔹 Buscar resenhas do usuário logado com todos os dados completos
  async function fetchResenhasDoUsuario(userId) {
    loading.value = true
    error.value = null

    try {
      const { data } = await resenhaService.fetchResenhasPorUsuario(userId)

      // 🔹 Preenche campos musica e usuario completos
      const completas = await Promise.all(
        data.map(async (r) => {
          let musica = r.musica
          let usuario = r.usuario

          // caso venha apenas o id, busca dados completos
          if (typeof musica === 'number' || !musica?.titulo) {
            try {
              const { data: mData } = await resenhaService.getMusicaById(musica)
              musica = mData
            } catch {
              musica = { titulo: 'Desconhecida', capa: '#' }
            }
          }

          if (typeof usuario === 'number' || !usuario?.avatar) {
            try {
              const { data: uData } = await resenhaService.getUsuarioById(usuario)
              usuario = uData
            } catch {
              usuario = { username: 'Usuário desconhecido', avatar: '#' }
            }
          }

          return { ...r, musica, usuario }
        })
      )

      resenhas.value = completas
      console.log('✅ Resenhas do usuário logado:', completas)
    } catch (err) {
      error.value = err
      console.error('Erro ao buscar resenhas do usuário:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    resenhas,
    loading,
    error,
    fetchResenhasDoUsuario,
  }
})
