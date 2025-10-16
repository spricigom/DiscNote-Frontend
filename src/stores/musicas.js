import { defineStore } from 'pinia'
import { ref } from 'vue'
import itunesService from '@/services/itunesService'
import { useResenhaStore } from '@/stores/resenhas'

export const useMusicasStore = defineStore('musicas', () => {
  const musicasPorGenero = ref({})
  const loading = ref(false)
  const error = ref(null)
  const musicaAtual = ref(null)
  const stats = ref({ totalresenhas: 0, average: 0 })
  const resenhasMusica = ref([])

  const resenhaStore = useResenhaStore()

  async function fetchMusicas(generos) {
    loading.value = true
    error.value = null
    for (const g of generos) {
      try {
        const res = await itunesService.buscarPorGenero(g.term)
        musicasPorGenero.value[g.nome] = res
      } catch (err) {
        console.error(`Erro ao buscar ${g.nome}:`, err)
        musicasPorGenero.value[g.nome] = []
      }
    }
    loading.value = false
  }

  async function fetchMusica(trackId) {
    loading.value = true
    error.value = null
    try {
      const track = await itunesService.lookup(trackId)
      if (!track) {
        throw new Error('Música não encontrada')
      }
      musicaAtual.value = track

      const { media_nota, total_resenhas } = await resenhaStore.getResenhaPorMusica(track.trackId)
      stats.value = { totalresenhas: total_resenhas, average: media_nota }

      await resenhaStore.fetchResenhas()

      resenhasMusica.value = (resenhaStore.fetchResenhasPorMusica(track.trackId))
    } catch (err) {
      console.error('Erro ao buscar música:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    musicasPorGenero,
    loading,
    error,
    musicaAtual,
    stats,
    resenhasMusica,
    fetchMusicas,
    fetchMusica
  }
})
