<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAlbunsStore } from '@/stores/albuns'
import { useAuthStore } from '@/stores/auth'
import { useResenhaStore } from '@/stores/resenhas'
import md5 from 'crypto-js/md5'

const route = useRoute()
const router = useRouter()
const albunsStore = useAlbunsStore()
const authStore = useAuthStore()
const resenhaStore = useResenhaStore()

const album = computed(() => albunsStore.albumAtual || {})
const stats = computed(() => albunsStore.stats || {})
const resenhas = computed(() => albunsStore.resenhasAlbum || [])
const loading = computed(() => albunsStore.loading)

const truncatedResenha = (resenha) => {
  if (!resenha) return ''
  const max = 420
  return resenha.length > max ? resenha.slice(0, max) + '...' : resenha
}

const minhaResenha = computed(() => {
  if (!authStore.isLogged) return null
  return resenhas.value.find(r => r.usuario?.id === authStore.user.id) || null
})

onMounted(() => {
  if (route.params.id) {
    albunsStore.fetchAlbum(route.params.id)
  }
})

function goToResenha() {
  if (!authStore.isLogged) {
    alert('Você precisa estar logado para escrever uma resenha.')
    router.push({ path: '/login' })
    return
  }
  router.push({ path: `/album/${route.params.id}/criarResenha` })
}

function deleteResenha() {
  if (!minhaResenha.value) return
  if (confirm('Tem certeza que deseja excluir sua resenha?')) {
    resenhaStore.deleteResenha(minhaResenha.value.id).then(() => {
      albunsStore.fetchAlbum(route.params.id)
    })
  }
}
</script>

<template>
  <HeaderComp />
  <main v-if="!loading">
    <div class="album">
      <div class="left">
        <img :src="album.capa?.replace('100x100bb', '1200x1200bb')" alt="Capa do álbum" class="imgAlbum" />
        <button @click="goToResenha()" id="escrever" :disabled="minhaResenha">
          {{ minhaResenha ? 'Resenha publicada' : 'Escrever Resenha' }}
        </button>
        <button @click="deleteResenha()" id="escrever" v-if="minhaResenha">
          Excluir minha resenha
        </button>
      </div>

      <div class="center">
        <div class="area-titulos">
          <h1 class="titulo">{{ album.titulo }}</h1>
          <h2 class="artista">{{ album.artista }}</h2>
        </div>
        <div id="generos">
          <p>Gêneros:</p>
          <div class="tags">
            <button class="tag">{{ album.genero }}</button>
          </div>
        </div>
        <section class="resenhas">
          <div id="cabecalho-resenha">
            <h3>Resenhas</h3>
            <a href="#" class="ver-mais">ver todas &gt;</a>
          </div>

          <article class="card-resenha" v-for="(res, i) in resenhas" :key="i">
            <div class="meta">
              <div class="foto-username">
                <img
                  class="foto-username"
                  :src="`https://www.gravatar.com/avatar/${md5(res.usuario.email.trim().toLowerCase())}?s=200&d=identicon`"
                  alt=""
                />
              </div>
              <div class="meta-text">
                <div class="user-row">
                  <strong>@{{ res.usuario.username }}</strong>
                  <div class="estrelas">
                    {{ res.nota }}
                    <span v-for="n in 5" :key="n" class="estrelas" :class="{ ativo: n <= res.nota }">★</span>
                  </div>
                  <div class="favorito">
                    <i class="pi pi-heart-fill"></i>
                  </div>
                  <span class="data">{{ res.data }}</span>
                </div>
              </div>
            </div>
            <p class="resenha-body">
              {{ truncatedResenha(res.texto) }}
              <a class="ver-maisResenha" href="#">ver mais &gt;</a>
            </p>
            <div class="resenha-footer">
              <span class="likes"><i class="pi pi-thumbs-up"></i> {{ res.curtidas_count.toLocaleString() }} curtidas</span>
            </div>
          </article>
        </section>
      </div>

      <aside class="right">
        <div class="stat">
          <div class="big">{{ stats.totalresenhas.toLocaleString() }}</div>
          <div class="label">Total de avaliações</div>
        </div>

        <div class="stat rating">
          <div class="stars">
            <span v-for="n in 5" :key="n" class="estrelas" :class="{ ativo: n <= stats.average }">★</span>
            <span class="avg">{{ stats.average }}</span>
          </div>
          <div class="label">Média das avaliações</div>
        </div>
      </aside>
    </div>
  </main>

   <div v-else class="loading-container">
  <div class="loader"></div>
  <p>Carregando álbum...</p>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&family=Montserrat:wght@100..900&display=swap');

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #0b1a1a; /* mesmo fundo do site */
  overflow-x: hidden;
}

main {
  min-height: 100vh;
  background-color: #0b1a1a;
}


.album {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 32px;
  height: 100%;
  font-family: 'Archivo', sans-serif;
}

.left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5vh;
}

.imgAlbum {
  width: 220px;
  height: 220px;
  background: #0b1a1a;
  border-radius: 18px;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
}

#escrever {
  border: 1.5px solid #fff;
  background: transparent;
  color: #fff;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
}

#escrever:disabled {
  border: 1.5px solid #888;
  color: #888;
  cursor: not-allowed;
}

.center {
  margin-left: 3vh;
  padding-top: 6px;
}

.area-titulos .titulo {
  color: white;
  font-size: 5vh;
  margin: 0;
}

.area-titulos .artista {
  margin-top: 0;
  color: #d8d8d8;
  font-size: 2vh;
}

#generos {
  margin-top: 5vh;
  color: #145d91;
}

#generos p {
  color: #145d91;
  border-bottom: 2px solid #145d91;
  font-size: 2.3vh;
}

.tags {
  display: flex;
  gap: 10px;
}

.tag {
  background: transparent;
  border: 2px solid #ecc815;
  color: #ecc815;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1.5vh;
}

#cabecalho-resenha {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #145d91;
  padding-bottom: 10px;
  margin-bottom: 1vh;
  margin-top: 3vh;
  color: #145d91;
}

#cabecalho-resenha h3 {
  margin: 0;
  font-size: 3vh;
}

.ver-mais {
  color: #145d91;
  text-decoration: none;
}

.foto-username {
  background-color: rgba(0, 0, 0, 0.315);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5vw;
}

strong {
  font-size: 1.7vh;
}

.card-resenha {
  margin-top: 2vh;
  padding: 8px 0;
  color: white;
}

.meta {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.user-row {
  display: flex;
  gap: 2.3vh;
  align-items: center;
}

.estrelas {
  color: #888;
  font-weight: 900;
  font-size: 2.5vh;
}

.estrelas.ativo {
  color: gold;
}

.data {
  color: #9e9e9e;
  font-size: 14px;
}

.resenha-body {
  margin-top: 0.7px;
  line-height: 1.45;
  color: #f3f7f7;
  font-size: 1.8vh;
}

.ver-maisResenha {
  color: #9e9e9e;
  text-decoration: none;
}

.resenha-footer {
  margin-top: 12px;
  color: white;
  font-family: 'Archivo', sans-serif;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 1vh;
  align-items: flex-end;
  margin-right: 7vh;
  font-family: 'Archivo', sans-serif;
  font-size: 2.5vh;
}

.stat .big {
  font-size: 3.5vh;
  color: #ecc815;
}

.stat .label {
  color: white;
}

.rating .stars {
  font-size: 3vh;
  color: #ecc815;
}

.rating .avg {
  margin-left: 8px;
  color: #fff;
}
.loading-container {
  height: 100vh;
  background-color: #0b1a1a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ecc815;
  font-family: 'Archivo', sans-serif;
  font-size: 2.3vh;
  letter-spacing: 0.5px;
}

.loader {
  width: 48px;
  height: 48px;
  border: 4px solid #ecc815;
  border-bottom-color: transparent;
  border-radius: 50%;
  margin-bottom: 18px;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
