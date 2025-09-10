<script setup>
import { ref } from 'vue'
import HeaderComp from '@/components/HeaderComp.vue'


const selectedTab = ref('resenhas')

const tabs = [
  { key: 'resenhas', label: 'Resenhas' },
  { key: 'playlists', label: 'Playlists' },
  { key: 'favoritos', label: 'Favoritos' },
  { key: 'mais-ouvidas', label: 'Mais Ouvidas' },
]
</script>

<template>
  <HeaderComp />
  <main>
    <div class="container">
      <div class="perfil-info">
        <img class="foto-perfil" src="#"   />
        <h2 class="username">Username</h2>
        <p class="arroba">@username</p>

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
        <div v-if="selectedTab === 'resenhas'">Conteúdo de Resenhas</div>
        <div v-else-if="selectedTab === 'playlists'">Conteúdo de Playlists</div>
        <div v-else-if="selectedTab === 'favoritos'">Conteúdo de Favoritos</div>
        <div v-else-if="selectedTab === 'mais-ouvidas'">Conteúdo de Mais Ouvidas</div>
      </div>
    </div>
  </main>

</template>

<style scoped>
main {
  height: 100vh;
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
  transition: all 0.3s;
  width: 15%;
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
  text-align: center;
  font-size: 18px;
}
</style>
