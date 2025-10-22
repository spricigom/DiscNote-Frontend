<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

/* ---------------- Header e Sidebar ---------------- */
const authStore = useAuthStore()
const showSubmenu = ref(false)
const showSidebar = ref(false)

function toggleSubmenu() {
  showSubmenu.value = !showSubmenu.value
}

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

/* ---------------- Busca iTunes ---------------- */
const searchQuery = ref('')
const results = ref({ albums: [], songs: [], artists: [] })
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
</script>

<template>
<header>
  <div class="logo">
    <RouterLink to="/home"><img src="@/assets/logo.png" alt="Logo DiscNote"></RouterLink>
  </div>

  <nav>
    <div class="nav-item" @click="toggleSubmenu">
      <RouterLink to="#">Explorar <span><i class="pi pi-angle-down"></i></span></RouterLink>
      <div class="submenu" v-if="showSubmenu">
        <RouterLink to="#">Álbuns</RouterLink>
        <hr>
        <RouterLink to="/musicas">Músicas</RouterLink>
        <hr>
        <RouterLink to="#">Artistas</RouterLink>
      </div>
    </div>
    <RouterLink to="#">Playlists</RouterLink>
    <RouterLink to="#">Resenhas</RouterLink>
    <RouterLink to="/cadastro">Cadastro</RouterLink>
  </nav>

  <div class="right">
    <!-- Barra de pesquisa -->
    <input
      v-model="searchQuery"
      @keyup.enter="searchItunes"
      placeholder="Buscar artista, álbum ou música..."
      class="search-input"
    />
    <button @click="searchItunes">Buscar</button>

    <span class="pi pi-plus"></span>
    <div v-if="authStore.isLogged" class="foto-user" @click="toggleSidebar">
      <img :src="authStore.user?.avatar" alt="Foto de Perfil">
    </div>
    <RouterLink v-else to="/login"><span class="pi pi-user"></span></RouterLink>

    <!-- Sidebar do usuário -->
    <div class="sidebar" v-if="showSidebar && authStore.isLogged">
      <div class="top">
        <div class="user">
          <div class="foto-user">
            <img :src="authStore.user?.avatar" alt="Foto de Perfil">
          </div>
          <h3>{{ authStore.user?.name || authStore.user?.username }}</h3>
        </div>
        <button class="close-btn" @click="toggleSidebar"><i class="pi pi-times" style="font-size: .5vw;"></i></button>
      </div>
      <hr style="margin-top: 4vh; width: 100%;">
      <div class="itens-sidebar">
        <p><RouterLink to="/perfil"><i class="pi pi-user" style="color: #145d91; font-size: 1.2vw;"></i> Seu Perfil</RouterLink></p>
        <p><RouterLink to="#"><i class="pi pi-clipboard" style="color: #145d91; font-size: 1.2vw;"></i> Suas Resenhas</RouterLink></p>
        <p><RouterLink to="#"><i class="pi pi-headphones" style="color: #145d91; font-size: 1.2vw;"></i> Suas Playlisys</RouterLink></p>
        <p><RouterLink to="#"><i class="pi pi-star" style="color: #145d91; font-size: 1.2vw;"></i> Favoritos</RouterLink></p>
        <p><RouterLink to="#" @click="authStore.logout(); toggleSidebar()"><i class="pi pi-sign-out" style="color: #145d91; font-size: 1.2vw;"></i> Sair</RouterLink></p>
      </div>
    </div>
    <div class="overlay" v-if="showSidebar" @click="toggleSidebar"></div>
  </div>
</header>

<div v-if="searched" class="search-results">
  <div class="tabs">
    <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id">
      {{ tab.label }}
    </button>
  </div>

  <div v-if="!isLoading">
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
