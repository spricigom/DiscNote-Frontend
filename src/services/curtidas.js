import api from '@/plugins/api'

export default new class CurtidaService {
  async getAll() {
    const { data } = await api.get('/curtidas/')
    return data
  }

  async getByResenha(resenhaId) {
    const { data } = await api.get('/curtidas/', {
      params: { resenha: resenhaId }
    })
    return data
  }

  async create(resenhaId) {
    const { data } = await api.post('/curtidas/', { resenha: resenhaId })
    return data
  }

  async remove(id) {
    await api.delete(`/curtidas/${id}/`)
  }
}()
