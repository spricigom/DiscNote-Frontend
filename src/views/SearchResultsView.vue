<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const searchQuery = ref(route.query.q || '')
const results = ref({ albums: [], songs: [], artists: [] })
const activeTab = ref('albums')
const isLoading = ref(false)

const tabs = [
  { id: 'albums', label: 'Álbuns' },
  { id: 'songs', label: 'Músicas' },
  { id: 'artists', label: 'Artistas' },
]

async function searchItunes() {
  if (!searchQuery.value.trim()) return
  isLoading.value = true
  results.value = { albums: [], songs: [], artists: [] }

  const term = encodeURIComponent(searchQuery.value)
  const limit = 200

  try {
    const [albumsRes, songsRes, artistsRes] = await Promise.all([
      fetch(`https://itunes.apple.com/search?term=${term}&entity=album&limit=${limit}`).then(r => r.json()),
      fetch(`https://itunes.apple.com/search?term=${term}&entity=musicTrack&limit=${limit}`).then(r => r.json()),
      fetch(`https://itunes.apple.com/search?term=${term}&entity=musicArtist&limit=${limit}`).then(r => r.json()),
    ])

    results.value.albums = albumsRes.results || []
    results.value.songs = songsRes.results || []
    results.value.artists = artistsRes.results || []
    activeTab.value = 'albums'
  } catch (err) {
    console.error('Erro ao buscar na API do iTunes:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  searchItunes()
})
</script>

<template>
  <div class="search-results-page">
    <h1>Resultados para "{{ searchQuery }}"</h1>

    <div>
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="{ active: activeTab === tab.id }"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="isLoading">Carregando...</div>

    <div v-else>
      <div v-show="activeTab === 'albums'">
        <div v-if="results.albums.length">
          <div v-for="album in results.albums" :key="album.collectionId">
            <img :src="album.artworkUrl100?.replace('100x100bb', '1000x1000bb')" alt=""/>
            <p>{{ album.collectionName }}</p>
            <p>{{ album.artistName }}</p>
          </div>
        </div>
        <div v-else>Nenhum álbum encontrado.</div>
      </div>

      <div v-show="activeTab === 'songs'">
        <div v-if="results.songs.length">
          <div v-for="song in results.songs" :key="song.trackId">
            <img :src="song.artworkUrl100?.replace('100x100bb', '1000x1000bb')" alt=""/>
            <p>{{ song.trackName }}</p>
            <p>{{ song.artistName }}</p>
            <audio :src="song.previewUrl" controls></audio>
          </div>
        </div>
        <div v-else>Nenhuma música encontrada.</div>
      </div>

      <div v-show="activeTab === 'artists'">
        <div v-if="results.artists.length">
          <div v-for="artist in results.artists" :key="artist.artistId">
            <p>{{ artist.artistName }}</p>
            <p>{{ artist.primaryGenreName || 'Gênero desconhecido' }}</p>
          </div>
        </div>
        <div v-else>Nenhum artista encontrado.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.active {
  background-color: #ECC815;
  color: #101A1A;
}
</style>
