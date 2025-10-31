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
        // usa o método do serviço com entity = 'album'
        const res = await itunesService.buscarPorGenero(g.term, 8, 'album')
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
      // usa o método lookup (não lookupAlbum)
      const album = await itunesService.lookup(collectionId)
      if (!album) throw new Error('Álbum não encontrado')

      // normaliza os campos para o template
      albumAtual.value = {
        id: album.collectionId || album.trackId,
        titulo: album.titulo || album.collectionName || album.trackName,
        artista: album.artista || album.artistName,
        capa: album.capa?.replace('100x100bb.jpg', '600x600bb.jpg') || album.artworkUrl100,
        genero: album.genero || album.primaryGenreName || 'Desconhecido'
      }

     // Busca estatísticas (nota média e total de resenhas)
const { media_nota, total_resenhas } = await resenhaStore.getResenhaPorMusica(collectionId)
stats.value = { totalresenhas: total_resenhas, average: media_nota }

// Busca apenas as resenhas desta música/álbum
resenhasAlbum.value = resenhaStore.fetchResenhasPorMusica(collectionId)

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
