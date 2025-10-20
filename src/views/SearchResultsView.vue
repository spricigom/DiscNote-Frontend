<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HeaderComp from '@/components/HeaderComp.vue'
import Footer from '@/components/Footer.vue';


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
  <HeaderComp />
  <main>
    <div class="search-results-page">
    <h1>Resultados para "{{ searchQuery }}"</h1>

    <div class="tabs">
  <button
    v-for="tab in tabs"
    :key="tab.id"
    @click="activeTab = tab.id"
    :class="['tab', { active: activeTab === tab.id }]"
  >
    {{ tab.label }}
  </button>
</div>


    <div v-if="isLoading">Carregando...</div>

    <div v-else>
  <!-- ÁLBUNS -->
  <div v-show="activeTab === 'albums'">
    <div v-if="results.albums.length" class="results-list">
      <div v-for="album in results.albums" :key="album.collectionId" class="result-item">
        <img
          :src="album.artworkUrl100?.replace('100x100bb', '200x200bb')"
          alt="Capa do Álbum"
          class="result-image"
        />
        <div class="result-info">
          <p class="title">{{ album.collectionName }}</p>
          <p class="artist">{{ album.artistName }}</p>
        </div>
      </div>
    </div>
    <div v-else>Nenhum álbum encontrado.</div>
  </div>

  <!-- MÚSICAS -->
  <div v-show="activeTab === 'songs'">
    <div v-if="results.songs.length" class="results-list">
      <div v-for="song in results.songs" :key="song.trackId" class="result-item">
        <img
          :src="song.artworkUrl100?.replace('100x100bb', '200x200bb')"
          alt="Capa da Música"
          class="result-image"
        />
        <div class="result-info">
          <p class="title">{{ song.trackName }}</p>
          <p class="artist">{{ song.artistName }}</p>
          <audio :src="song.previewUrl" controls class="audio-preview"></audio>
        </div>
      </div>
    </div>
    <div v-else>Nenhuma música encontrada.</div>
  </div>

  <!-- ARTISTAS -->
  <div v-show="activeTab === 'artists'">
    <div v-if="results.artists.length" class="results-list">
      <div v-for="artist in results.artists" :key="artist.artistId" class="result-item">
        <div class="result-info">
          <p class="title">{{ artist.artistName }}</p>
          <p class="artist">{{ artist.primaryGenreName || 'Gênero desconhecido' }}</p>
        </div>
      </div>
    </div>
    <div v-else>Nenhum artista encontrado.</div>
  </div>
</div>

  </div>
  </main>
  <Footer />
</template>

<style scoped>
main {
  background-color: #162326;
  min-height: 70vh;
  display: flex;
}

.search-results-page {
  width: 100%;
  text-align: center;
  color: white;
  font-family: 'Archivo', sans-serif;
}

/* Tabs */
.tabs {
  display: flex;
  justify-content: center;
  margin-top: 3vh;
}

.tab {
  background: none;
  border: none;
  color: #bebebe;
  font-family: 'Archivo', sans-serif;
  padding: 15px 25px;
  cursor: pointer;
  font-size: 1.3vw;
  border-bottom: 2px solid #145d91; /* Azul padrão */
  transition: all 0.3s;
  width: 20%;
  margin-bottom: 5vh;
}

.tab:hover {
  color: white;
}

.tab.active {
  color: white;
  border-bottom: 2px solid #f9d849; /* Amarelo quando ativa */
}
/* Resultados */
.results-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4vh;
  gap: 20px;
}

.result-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 12px;
  background-color: black;
  transition: background 0.3s;
  width: 30vw;
  
}

.result-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.result-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.result-info {
  text-align: left;
  flex: 1;
}

.title {
  font-weight: 600;
  font-size: 1.3vw;
  color: white;
  margin-bottom: 5px;
}

.artist {
  font-size: 1vw;
  color: #bcbcbc;
  margin-bottom: 8px;
}

.audio-preview {
  width: 200px;
  height: 30px;
}
</style>
