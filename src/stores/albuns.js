import { defineStore } from 'pinia'
import { ref } from 'vue'
import itunesService from '@/services/itunesService'
import { useResenhaStore } from '@/stores/resenhas'

export const useAlbunsStore = defineStore('albuns', () => {
  const albunsPorGenero = ref({})
  const loading = ref(false)
  const error = ref(null)
  const albumAtual = ref(null)
  const stats = ref({ totalresenhas: 0, average: 0 })
  const resenhasAlbum = ref([])

  const resenhaStore = useResenhaStore()

  /**
   * Busca álbuns por uma lista de gêneros (array de objetos { nome, term })
   */
  async function fetchAlbuns(generos) {
    loading.value = true
    error.value = null
    albunsPorGenero.value = {}

    for (const g of generos) {
      try {
        const res = await itunesService.buscarAlbunsPorGenero(g.term)
        albunsPorGenero.value[g.nome] = res
      } catch (err) {
        console.error(`Erro ao buscar álbuns de ${g.nome}:`, err)
        albunsPorGenero.value[g.nome] = []
      }
    }

    loading.value = false
  }

  /**
   * Busca dados completos de um álbum específico pelo collectionId
   */
  async function fetchAlbum(collectionId) {
    loading.value = true
    error.value = null
    albumAtual.value = null
    resenhasAlbum.value = []

    try {
      const album = await itunesService.lookupAlbum(collectionId)
      if (!album) throw new Error('Álbum não encontrado')

      albumAtual.value = album

      // Busca estatísticas (nota média e total de resenhas)
      const { media_nota, total_resenhas } = await resenhaStore.getResenhaPorAlbum(collectionId)
      stats.value = { totalresenhas: total_resenhas, average: media_nota }

      // Busca apenas as resenhas deste álbum
      resenhasAlbum.value = await resenhaStore.fetchResenhasPorAlbum(collectionId)
    } catch (err) {
      console.error('Erro ao buscar álbum:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    albunsPorGenero,
    loading,
    error,
    albumAtual,
    stats,
    resenhasAlbum,
    fetchAlbuns,
    fetchAlbum
  }
})
