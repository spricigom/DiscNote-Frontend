<script setup>
import { ref } from 'vue'
import HeaderComp from '@/components/HeaderComp.vue'
import ResenhaPerfil from '@/components/ResenhaPerfil.vue'
import PlaylistsPerfil from '@/components/PlaylistsPerfil.vue'
import FavoritosPerfil from '@/components/FavoritosPerfil.vue'

import { useAuthStore } from '@/stores/auth'


const selectedTab = ref('resenhas')
const authStore = useAuthStore()

const tabs = [
  { key: 'resenhas', label: 'Resenhas' },
  { key: 'playlists', label: 'Playlists' },
  { key: 'favoritos', label: 'Favoritos' },
//  { key: 'mais-ouvidas', label: 'Mais Ouvidas' },
]


</script>

<template>
  <HeaderComp />
  <main>
    <div class="container">
      <div class="perfil-info">
        <img class="foto-perfil" :src="authStore.user?.avatar" />
        <h2 class="username">{{ authStore.user.name }}</h2>
        <p class="arroba">@{{ authStore.user.username }}</p>

        <div class="stats">
          <div class="stat">
            <span class="number">235</span>
            <span class="label">Seguidores</span>
          </div>
          <div class="stat">
            <span class="number">400</span>
            <span class="label">Seguindo</span>
          </div>
          <div class="stat">
            <span class="number">19</span>
            <span class="label">Resenhas</span>
          </div>
          <div class="stat">
            <span class="number">8</span>
            <span class="label">Playlists</span>
          </div>
        </div>

        <RouterLink to="/EditarPerfil"><button class="btn-seguir" @click="toggleFollow">Editar perfil</button></RouterLink>
        
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button v-for="tab in tabs" :key="tab.key" :class="['tab', { active: selectedTab === tab.key }]"
          @click="selectedTab = tab.key">
          {{ tab.label }}
        </button>
      </div>

      <!-- Conteúdo da Aba Selecionada -->
      <div class="tab-content">
        <div v-if="selectedTab === 'resenhas'"><ResenhaPerfil /><ResenhaPerfil /></div>
        <div class="playlists" v-else-if="selectedTab === 'playlists'"><PlaylistsPerfil /><PlaylistsPerfil /><PlaylistsPerfil /><PlaylistsPerfil /></div>
        <div v-else-if="selectedTab === 'favoritos'"><FavoritosPerfil /></div>
    <!--<div v-else-if="selectedTab === 'mais-ouvidas'">Conteúdo de Mais Ouvidas</div>-->
      </div>
      <div class="divisao">hr</div>
    </div>
  </main>

</template>

<style scoped>
.playlists{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 45vw;
  flex-wrap: wrap;

}

.perfil-info {
  text-align: center;
  margin-top: 7vh;
}

.foto-perfil {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #444;
  background-color: rgba(0, 0, 0, 0.315);
}

.username {
  margin-top: 15px;
  font-size: 1.8vw;
  font-weight: 600;
  font-family: 'Archivo', sans-serif;
  color: white;
}

.arroba {
  color: #145d91;
  font-size: 1.2vw;
  margin-bottom: 15px;
  font-family: 'Archivo', sans-serif;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 4%;
  margin-top: 7vh;
}

.stat .number {
  display: block;
  font-size: 1.5vw;
  color: #ecc815;
  font-weight: 400;
  font-family: 'DM Mono', sans-serif;
  margin-bottom: 1vh;
}

.stat .label {
  font-size: 1.1vw;
  color: white;
  font-family: 'Archivo', sans-serif;
}

/* Tabs */
.tabs {
  display: flex;
  justify-content: center;
  margin-top: 8vh;
  font-size: 1.2vw;
}

.tab {
  background: none;
  border: none;
  color: #bebebe;
  font-family: 'Archivo', sans-serif;
  padding: 15px 25px;
  cursor: pointer;
  font-size: 1.3vw;
  border-bottom: 2px solid #145d91;
  transition: all 0.2s;
  width: 20vw;
}

.tab:hover {
  color: white;
}

.tab.active {
  color: white;
  border-bottom: 2px solid #f9d849;
}

.tab-content {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center; /* garante que itens menores que 100% fiquem centrados */
  gap: 5vh;
  width: 100%;
}

.btn-seguir {
  margin-top: 5vh;
  padding: 10px 30px;
  font-size: 1.2vw;
  font-family: 'Archivo', sans-serif;
  font-weight: 600;
  color: white;
  background: transparent;
  border: 2px solid white;
  border-radius: 5px;
  cursor: pointer;
}

.divisao {
  width: 100%;
  margin-bottom: 4vh;
}
.divisao hr {
  width: 100%;
  border: #145d91 1px solid;
}

</style>
