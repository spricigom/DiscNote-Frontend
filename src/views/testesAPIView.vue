<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Buscar no iTunes</h1>

    <!-- Campo de busca -->
    <div class="flex gap-2 mb-6">
      <input
        v-model="searchQuery"
        @keyup.enter="searchItunes"
        placeholder="Digite o nome de um artista, álbum ou música..."
        class="border p-2 w-full rounded"
      />
      <button
        @click="searchItunes"
        :disabled="isLoading"
        class="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {{ isLoading ? 'Carregando...' : 'Buscar' }}
      </button>
    </div>

    <!-- Tabs -->
    <div v-if="searched" class="mb-4 flex border-b">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 font-medium transition',
          activeTab === tab.id
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-600 hover:text-blue-600'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Resultados -->
    <div v-if="searched && !isLoading">
      <!-- ÁLBUNS -->
      <div v-show="activeTab === 'albums'">
        <h2 class="text-xl font-semibold mb-3">Álbuns</h2>
        <div v-if="results.albums.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="album in results.albums"
            :key="album.collectionId"
            class="border rounded p-2 shadow hover:shadow-md transition"
          >
            <img :src="album.artworkUrl100" alt="" class="rounded mb-2 w-full" />
            <h3 class="font-semibold text-sm truncate">{{ album.collectionName }}</h3>
            <p class="text-gray-600 text-xs truncate">{{ album.artistName }}</p>
          </div>
        </div>
        <p v-else class="text-gray-500">Nenhum álbum encontrado.</p>
      </div>

      <!-- MÚSICAS -->
      <div v-show="activeTab === 'songs'">
        <h2 class="text-xl font-semibold mb-3">Músicas</h2>
        <div v-if="results.songs.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="song in results.songs"
            :key="song.trackId"
            class="flex items-center gap-3 border rounded p-2 shadow hover:shadow-md transition"
          >
            <img :src="song.artworkUrl60" alt="" class="rounded w-16 h-16" />
            <div class="flex-1">
              <h3 class="font-semibold text-sm truncate">{{ song.trackName }}</h3>
              <p class="text-gray-600 text-xs truncate">{{ song.artistName }}</p>
            </div>
            <audio :src="song.previewUrl" controls class="w-32"></audio>
          </div>
        </div>
        <p v-else class="text-gray-500">Nenhuma música encontrada.</p>
      </div>

      <!-- ARTISTAS -->
      <div v-show="activeTab === 'artists'">
        <h2 class="text-xl font-semibold mb-3">Artistas</h2>
        <div v-if="results.artists.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="artist in results.artists"
            :key="artist.artistId"
            class="border rounded p-4 flex flex-col items-center text-center shadow hover:shadow-md transition"
          >
            <div class="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold text-gray-500 mb-2">
              {{ artist.artistName.charAt(0) }}
            </div>
            <h3 class="font-semibold text-sm truncate">{{ artist.artistName }}</h3>
            <p class="text-gray-500 text-xs">{{ artist.primaryGenreName || 'Gênero desconhecido' }}</p>
          </div>
        </div>
        <p v-else class="text-gray-500">Nenhum artista encontrado.</p>
      </div>

      <!-- Nenhum resultado -->
      <div v-if="!results.albums.length && !results.songs.length && !results.artists.length">
        <p class="text-gray-500">Nenhum resultado encontrado para "{{ searchQuery }}".</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const results = ref({
  albums: [],
  songs: [],
  artists: []
})
const activeTab = ref('albums') // padrão: Álbuns
const isLoading = ref(false)
const searched = ref(false)

const tabs = [
  { id: 'albums', label: 'Álbuns 💿' },
  { id: 'songs', label: 'Músicas 🎵' },
  { id: 'artists', label: 'Artistas 👤' },
]

async function searchItunes() {
  if (!searchQuery.value.trim()) return
  isLoading.value = true
  searched.value = true
  results.value = { albums: [], songs: [], artists: [] }

  const term = encodeURIComponent(searchQuery.value)
  const limit = 200 // ✅ limite máximo da API

  try {
    const [albumsRes, songsRes, artistsRes] = await Promise.all([
      fetch(`https://itunes.apple.com/search?term=${term}&entity=album&limit=${limit}`).then(r => r.json()),
      fetch(`https://itunes.apple.com/search?term=${term}&entity=musicTrack&limit=${limit}`).then(r => r.json()),
      fetch(`https://itunes.apple.com/search?term=${term}&entity=musicArtist&limit=${limit}`).then(r => r.json()),
    ])

    results.value.albums = albumsRes.results || []
    results.value.songs = songsRes.results || []
    results.value.artists = artistsRes.results || []

    activeTab.value = 'albums' // mostra Álbuns por padrão
  } catch (err) {
    console.error('Erro ao buscar na API do iTunes:', err)
  } finally {
    isLoading.value = false
  }
}
</script>
