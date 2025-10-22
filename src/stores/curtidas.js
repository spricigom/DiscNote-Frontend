import { defineStore } from 'pinia'
import { ref } from 'vue'
import curtidaService from '@/services/curtidas'

export const useCurtidaStore = defineStore('curtidas', () => {
  const curtidas = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchCurtidas() {
    loading.value = true
    error.value = null
    try {
      curtidas.value = await curtidaService.getAll()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function fetchByResenha(resenhaId) {
    return curtidas.value.filter(c => c.resenha === resenhaId)
  }

  async function addCurtida(resenhaId) {
    try {
      const nova = await curtidaService.create(resenhaId)
      curtidas.value.push(nova)
      return nova
    } catch (err) {
      error.value = err
      throw err
    }
  }

  async function removeCurtida(curtidaId) {
    try {
      await curtidaService.remove(curtidaId)
      curtidas.value = curtidas.value.filter(c => c.id !== curtidaId)
    } catch (err) {
      error.value = err
    }
  }

  return {
    curtidas,
    loading,
    error,
    fetchCurtidas,
    fetchByResenha,
    addCurtida,
    removeCurtida,
  }
})
