import itunesApi from '@/plugins/itunesApi'

export default new class ItunesService {
  async buscarPorGenero(termo, limit = 8, entity = 'musicTrack') {
    const { data } = await itunesApi.get('/search', {
      params: {
        term: termo,
        entity, 
        limit
      }
    });

    if (entity === 'musicTrack') {
      return data.results.map(track => ({
        trackId: track.trackId,
        titulo: track.trackName,
        artista: track.artistName,
        capa: track.artworkUrl100,
        ouvintes: `${Math.floor(Math.random() * 500 + 50)}k`,
        nota: `${(Math.random() * 1.5 + 3.5).toFixed(1)}/5`,
        previewUrl: track.previewUrl
      }));
    } else if (entity === 'album') {
      return data.results.map(album => ({
        collectionId: album.collectionId,
        titulo: album.collectionName,
        artista: album.artistName,
        capa: album.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg')
      }));
    }

    return [];
  }


  async buscarMusicas(termo, limit = 10) {
    const { data } = await itunesApi.get('/search', {
      params: {
        term: termo,
        entity: 'song',
        limit,
      },
    });
    return data.results;
  }

  async lookup(trackId) {
    const { data } = await itunesApi.get('/lookup', {
      params: { id: trackId }
    })

    if (!data.results || data.results.length === 0) return null

    const track = data.results[0]
    return {
      trackId: track.trackId,
      titulo: track.trackName,
      artista: track.artistName,
      capa: track.artworkUrl100,
      genero: track.primaryGenreName,
      previewUrl: track.previewUrl,
    }
  }
}
