<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderComp from '@/components/HeaderComp.vue'
import { useAuthStore } from '@/stores/auth'
import { useResenhaStore } from "@/stores/resenhas.js";
import Resenha from "@/components/Resenha.vue";
import { onMounted } from "vue";

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const resenhaStore = useResenhaStore();

const selectedTab = ref('resenhas')
const perfilMain = ref(null)

const tabs = [
  { key: 'resenhas', label: 'Resenhas' },
  { key: 'favoritos', label: 'Resenhas Favoritas' },
  { key: 'favoritadas', label: 'Musicas Favoritadas'}
]

watch(
  () => route.query.tab,
  async (newTab) => {
    if (['resenhas', 'favoritos'].includes(newTab)) {
      selectedTab.value = newTab
      await nextTick()
      perfilMain.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },
  { immediate: true }
)

function changeTab(tabKey) {
  selectedTab.value = tabKey
  router.push({ query: { tab: tabKey } })
  perfilMain.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(async () => {
  await resenhaStore.fetchResenhas(); // pega todas
});

</script>

<template>
  <HeaderComp />
  <main ref="perfilMain">
    <div class="container">
      <div class="perfil-info">
        <img class="foto-perfil" :src="authStore.user?.avatar" />
        <h2 class="username">{{ authStore.user.name }}</h2>
        <p class="arroba">@{{ authStore.user.username }}</p>

        <div class="stats">
          <div class="stat">
            <span class="number">0</span>
            <span class="label">Seguidores</span>
          </div>
          <div class="stat">
            <span class="number">0</span>
            <span class="label">Seguindo</span>
          </div>
          <div class="stat">
            <span class="number">17</span>
            <span class="label">Resenhas</span>
          </div>

        </div>

        <RouterLink to="/EditarPerfil">
          <button class="btn-seguir">Editar perfil</button>
        </RouterLink>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab', { active: selectedTab === tab.key }]"
          @click="changeTab(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-content">
        <div v-if="selectedTab === 'resenhas'">
<Resenha
  v-for="r in resenhaStore.getResenhasDoUsuario('manuhostin')"
  :key="r.id"
  :resenha="r"
/>
        </div>
        <div v-else-if="selectedTab === 'favoritos'">
  <Resenha
    v-for="r in resenhaStore.resenhas.slice(0, 5)"
    :key="r.id"
    :resenha="r"
  />
</div>
 <div v-if="selectedTab === 'favoritadas'">
<Resenha
  v-for="r in resenhaStore.getResenhasDoUsuario('manuhostin').slice(0, 10)"
  :key="r.id"
  :resenha="r"
/>

        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
.playlists {
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
  align-items: center;
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
