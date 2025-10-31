<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import Footer from '@/components/Footer.vue'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMusicasStore } from '@/stores/musicas'
import { useAuthStore } from '@/stores/auth'
import { useResenhaStore } from '@/stores/resenhas'
import md5 from 'crypto-js/md5'

const route = useRoute()
const router = useRouter()
const musicasStore = useMusicasStore()
const authStore = useAuthStore()
const resenhaStore = useResenhaStore()

const musica = computed(() => musicasStore.musicaAtual || {})
const stats = computed(() => musicasStore.stats || {})
const resenhas = computed(() => musicasStore.resenhasMusica || [])
const loading = computed(() => musicasStore.loading)

const truncatedResenha = (texto) => {
  const max = 420
  return texto && texto.length > max ? texto.slice(0, max) + '...' : texto
}

const minhaResenha = computed(() => {
  if (!authStore.isLogged) return null
  return resenhas.value.find(r => r.usuario?.id === authStore.user.id) || null
})

onMounted(() => {
  if (route.params.id) {
    musicasStore.fetchMusica(route.params.id)
  }
})

function goToResenha() {
  if (!authStore.isLogged) {
    alert('Você precisa estar logado para escrever uma resenha.')
    router.push({ path: '/login' })
    return
  }
  router.push({ path: `/musica/${route.params.id}/criarResenha` })
}

function deleteResenha() {
  if (!minhaResenha.value) return
  if (confirm('Tem certeza que deseja excluir sua resenha?')) {
    resenhaStore.deleteResenha(minhaResenha.value.id).then(() => {
      musicasStore.fetchMusica(route.params.id)
    })
  }
}
</script>

<template>
  <HeaderComp />
  <main v-if="!loading">
    <div class="musica">
      <!-- LADO ESQUERDO -->
      <div class="left">
        <div class="imgMusica">
          <img
            v-if="musica.capa"
            :src="musica.capa.replace('100x100bb', '1200x1200bb')"
            alt="Capa da música"
          />
        </div>

        <div class="acoes">
          <button @click="goToResenha()" :disabled="minhaResenha">
            {{ minhaResenha ? 'Resenha publicada' : 'Escrever Resenha' }}
          </button>
          <button v-if="minhaResenha" @click="deleteResenha()">Excluir minha resenha</button>
        </div>

        <audio v-if="musica.previewUrl" :src="musica.previewUrl" controls />
      </div>

      <!-- CENTRO -->
      <div class="direita">
        <div class="cima">
          <div class="center">
            <div class="area-titulos">
              <h1 class="titulo">{{ musica.titulo }}</h1>
              <h2 class="artista">{{ musica.artista }}</h2>
            </div>
            <div id="generos">
              <p>Gêneros:</p>
              <div class="tags">
                <button v-if="musica.genero" class="tag">{{ musica.genero }}</button>
              </div>
            </div>
          </div>

          <div class="right">
            <div class="stat">
              <div class="big">{{ stats.totalresenhas?.toLocaleString() || 0 }}</div>
              <div class="label">Total de avaliações</div>
            </div>

            <div class="stat rating">
              <div class="stars">
                <span v-for="n in 5" :key="n" class="estrelas" :class="{ ativo: n <= stats.average }">
                  ★
                </span>
                <span class="avg">{{ stats.average?.toFixed(1) || '0.0' }}</span>
              </div>
              <div class="label">Média das avaliações</div>
            </div>
          </div>
        </div>

        <!-- RESENHAS -->
        <section class="resenhas">
          <div id="cabecalho-resenha">
            <h3>Resenhas</h3>
            <RouterLink class="ver-todas" to="/VerMaisResenhas">ver todas</RouterLink>
          </div>

          <article class="card-resenha" v-for="(res, i) in resenhas" :key="i">
            <div class="meta">
              <div class="foto-username">
                <img
                  :src="`https://www.gravatar.com/avatar/${md5(res.usuario.email.trim().toLowerCase())}?s=200&d=identicon`"
                  alt="Avatar"
                />
              </div>
              <div class="meta-text">
                <div class="user-row">
                  <strong>@{{ res.usuario.username }}</strong>
                  <div class="estrelas">
                    <span v-for="n in 5" :key="n" :class="{ ativo: n <= res.nota }">★</span>
                    <span>({{ res.nota }})</span>
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
              <span class="likes"
                ><i class="pi pi-thumbs-up"></i> {{ res.curtidas_count?.toLocaleString() }} curtidas</span
              >
            </div>
          </article>
        </section>
      </div>
    </div>
  </main>

  <!-- LOADING -->
  <div v-else class="loading-container">
    <div class="loader"></div>
    <p>Carregando música...</p>
  </div>

  <Footer />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&family=DM+Mono:wght@300;400;500&display=swap');

main {
  min-height: 100vh;
  background-color: #162326;
  color: white;
}

.musica {
  display: grid;
  grid-template-columns: 1.5fr 5fr 1fr;
  height: 100%;
  font-family: 'Archivo', sans-serif;
}

.left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5vh;
  margin-left: 7vw;
  margin-top: 7vh;
}

.imgMusica {
  width: 270px;
  height: 270px;
  background: #00000050;
  border-radius: 25px;
  overflow: hidden;
}
.imgMusica img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.acoes {
  display: flex;
  flex-direction: column;
}
.acoes button {
  border: 1px solid white;
  background: transparent;
  color: white;
  padding: 1vh 1vw;
  border-radius: 7px;
  font-size: 1.1vw;
  margin-top: 3vh;
  cursor: pointer;
}
.acoes button:disabled {
  border-color: #777;
  color: #777;
  cursor: not-allowed;
}

.direita {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin-left: 4vw;
}

.cima {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 7vh;
}

.center {
  padding-top: 6px;
  width: 40vw;
}

.area-titulos .titulo {
  color: white;
  font-size: 6vh;
  margin: 0;
}
.area-titulos .artista {
  margin-top: 0;
  color: #a3a3a3;
  font-size: 3.5vh;
}

#generos {
  margin-top: 5vh;
  color: #145d91;
}
#generos p {
  color: #145d91;
  border-bottom: 2px solid #145d91;
  font-size: 1.4vw;
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
  font-size: 1.1vw;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  font-family: 'Archivo', sans-serif;
  font-size: 2.5vh;
  margin-left: 7vh;
}

.stat {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.stat .big {
  font-size: 2vw;
  color: #ecc815;
  font-family: 'DM Mono', sans-serif;
}
.stat .label {
  color: white;
  font-size: 1.6vw;
}
.rating .stars {
  font-size: 1.8vw;
  color: #ecc815;
}
.rating .avg {
  margin-left: 5px;
  color: #ecc815;
  font-size: 2vw;
  font-family: 'DM Mono', sans-serif;
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

.ver-todas{
  text-decoration: none;
  color: #145d91;
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
  gap: 1.5vh;
}
.foto-username {
  background-color: rgba(0, 0, 0, 0.315);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.foto-username img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loading-container {
  height: 100vh;
  background-color: #162326;
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
