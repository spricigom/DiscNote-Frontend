<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const results = ref({
  albums: [],
  songs: [],
  artists: [],
})
const activeTab = ref('albums')
const isLoading = ref(false)
const searched = ref(false)

const tabs = [
  { id: 'albums', label: 'Álbuns' },
  { id: 'songs', label: 'Músicas' },
  { id: 'artists', label: 'Artistas' },
]

async function searchItunes() {
  if (!searchQuery.value.trim()) return
  isLoading.value = true
  searched.value = true
  results.value = { albums: [], songs: [], artists: [] }

  const term = encodeURIComponent(searchQuery.value)
  const limit = 200

  try {
    const [albumsRes, songsRes, artistsRes] = await Promise.all([
      fetch(`https://itunes.apple.com/search?term=${term}&entity=album&limit=${limit}`).then((r) =>
        r.json(),
      ),
      fetch(`https://itunes.apple.com/search?term=${term}&entity=musicTrack&limit=${limit}`).then(
        (r) => r.json(),
      ),
      fetch(`https://itunes.apple.com/search?term=${term}&entity=musicArtist&limit=${limit}`).then(
        (r) => r.json(),
      ),
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
</script>

<template>
  <div>
    <h1>Buscar no iTunes</h1>

    <div>
      <input v-model="searchQuery" @keyup.enter="searchItunes" placeholder="Digite o nome de um artista, álbum ou música..."/>
      <button @click="searchItunes">Buscar</button>
    </div>

    <div v-if="searched">
      <div>
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div v-if="!isLoading">
        <!-- Álbuns -->
        <div v-show="activeTab === 'albums'">
          <h2>Álbuns</h2>
          <div v-if="results.albums.length">
            <div v-for="album in results.albums" :key="album.collectionId">
              <img :src="album.artworkUrl100?.replace('100x100bb', '1000x1000bb')" alt=""/>
              <p>{{ album.collectionName }}</p>
              <p>{{ album.artistName }}</p>
            </div>
          </div>
          <div v-else>
            Nenhum álbum encontrado.
          </div>
        </div>

        <!-- Músicas -->
        <div v-show="activeTab === 'songs'">
          <h2>Músicas</h2>
          <div v-if="results.songs.length">
            <div v-for="song in results.songs" :key="song.trackId">
              <img :src="song.artworkUrl100?.replace('100x100bb', '1000x1000bb')" alt=""/>
              <p>{{ song.trackName }}</p>
              <p>{{ song.artistName }}</p>
              <audio :src="song.previewUrl" controls></audio>
            </div>
          </div>
          <div v-else>
            Nenhuma música encontrada.
          </div>
        </div>

        <!-- Artistas -->
        <div v-show="activeTab === 'artists'">
          <h2>Artistas</h2>
          <div v-if="results.artists.length">
            <div v-for="artist in results.artists" :key="artist.artistId">
              <p>{{ artist.artistName }}</p>
              <p>{{ artist.primaryGenreName || 'Gênero desconhecido' }}</p>
            </div>
          </div>
          <div v-else>
            Nenhum artista encontrado.
          </div>
        </div>

        <!-- Nenhum resultado -->
        <div v-if="!results.albums.length && !results.songs.length && !results.artists.length">
          Nenhum resultado encontrado para "{{ searchQuery }}".
        </div>
      </div>
    </div>
  </div>
</template>
