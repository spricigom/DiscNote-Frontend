<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import Footer from '@/components/Footer.vue'
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
    albunsStore.fetchAlbuns(route.params.id)
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
      <aside class="coluna-capa">
        <div class="imgAlbum">
          <img
            v-if="album.capa"
            :src="album.capa.replace('100x100bb', '1200x1200bb')"
            alt="Capa do álbum"
          />
        </div>

        <div class="acoes">
          <button class="btn-primario" @click="goToResenha()" :disabled="minhaResenha">
            {{ minhaResenha ? 'Resenha publicada' : 'Escrever Resenha' }}
          </button>
          <button v-if="minhaResenha" class="btn-perigo" @click="deleteResenha()">
            Excluir minha resenha
          </button>
        </div>
      </aside>

      <div class="conteudo">
        <div class="cabecalho-musica">
          <div class="area-titulos">
            <h1 class="titulo">{{ album.titulo }}</h1>
            <h2 class="artista">{{ album.artista }}</h2>
            <span v-if="album.genero" class="tag">{{ album.genero }}</span>
          </div>

          <div class="stats-card">
            <div class="stat">
              <div class="big">{{ stats.totalresenhas?.toLocaleString() || 0 }}</div>
              <div class="label">avaliações</div>
            </div>
            <div class="divisor-stat"></div>
            <div class="stat">
              <div class="stars">
                <span v-for="n in 5" :key="n" :class="{ ativo: n <= stats.average }">★</span>
              </div>
              <div class="label">{{ stats.average?.toFixed(1) || '0.0' }} de média</div>
            </div>
          </div>
        </div>

        <section class="resenhas">
          <div class="cabecalho-resenha">
            <h3>Resenhas</h3>
            <RouterLink class="ver-todas" to="/VerMaisResenhas">ver todas</RouterLink>
          </div>

          <p v-if="!resenhas.length" class="vazio">Ainda não há resenhas para esse álbum.</p>

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
                    <span class="nota-numero">({{ res.nota }})</span>
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
            </p>

            <div class="resenha-footer">
              <span class="likes">
                <i class="pi pi-thumbs-up"></i>
                {{ res.curtidas_count?.toLocaleString() }} curtidas
              </span>
            </div>
          </article>
        </section>
      </div>
    </div>
  </main>

  <div v-else class="loading-container">
    <div class="loader"></div>
    <p>Carregando álbum...</p>
  </div>

  <Footer />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&family=Montserrat:wght@100..900&family=DM+Mono:wght@300;400;500&display=swap');

main {
  min-height: 100vh;
  background-color: #162326;
  color: white;
}

.album {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6vh 4vw 10vh;
  font-family: 'Archivo', sans-serif;
}

.coluna-capa {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.imgAlbum {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #0d1717;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
.imgAlbum img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.acoes {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.btn-primario,
.btn-perigo {
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-primario {
  border: none;
  background: #145d91;
  color: white;
}
.btn-primario:hover:not(:disabled) {
  background: #0f4a73;
}
.btn-primario:disabled {
  background: #26383c;
  color: #7c8b8e;
  cursor: not-allowed;
}

.btn-perigo {
  border: 1px solid #a33a3a;
  background: transparent;
  color: #e07a7a;
}
.btn-perigo:hover {
  background: rgba(163, 58, 58, 0.12);
}

.conteudo {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cabecalho-musica {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}

.area-titulos {
  min-width: 0;
}

.titulo {
  color: white;
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.15;
}
.artista {
  margin: 6px 0 0;
  color: #a3a3a3;
  font-size: 1.2rem;
  font-weight: 400;
}
.tag {
  display: inline-block;
  margin-top: 14px;
  background: transparent;
  border: 1px solid #ecc815;
  color: #ecc815;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.stats-card {
  display: flex;
  align-items: center;
  gap: 24px;
  background: #1c2b2f;
  border-radius: 14px;
  padding: 18px 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}
.divisor-stat {
  width: 1px;
  align-self: stretch;
  background: #2f4247;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 90px;
}
.stat .big {
  font-size: 1.7rem;
  color: #ecc815;
  font-family: 'DM Mono', sans-serif;
  font-weight: 500;
}
.stat .label {
  color: #a3a3a3;
  font-size: 0.85rem;
  margin-top: 4px;
}
.stars {
  display: flex;
  gap: 2px;
  color: #3a4a4d;
  font-size: 1.4rem;
}
.stars .ativo {
  color: #ecc815;
}

.resenhas {
  margin-top: 5vh;
}
.cabecalho-resenha {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #145d91;
  padding-bottom: 10px;
  margin-bottom: 8px;
}
.cabecalho-resenha h3 {
  margin: 0;
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
}
.ver-todas {
  text-decoration: none;
  color: #145d91;
  font-size: 0.9rem;
}
.ver-todas:hover {
  text-decoration: underline;
}

.vazio {
  color: #6b7a7d;
  padding: 24px 0;
}

.card-resenha {
  margin-top: 16px;
  padding: 18px;
  border-radius: 12px;
  background: #1c2b2f;
  transition: background 0.2s ease;
}
.card-resenha:hover {
  background: #223236;
}
.meta {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.user-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
.user-row strong {
  color: white;
}
.estrelas {
  display: flex;
  align-items: center;
  gap: 2px;
  color: #3a4a4d;
  font-size: 1rem;
}
.estrelas .ativo {
  color: #ecc815;
}
.nota-numero {
  color: #9e9e9e;
  margin-left: 4px;
  font-family: 'DM Mono', sans-serif;
  font-size: 0.85rem;
}
.favorito {
  color: #145d91;
  font-size: 1rem;
}
.data {
  color: #9e9e9e;
  font-size: 0.85rem;
}
.resenha-body {
  margin-top: 10px;
  line-height: 1.5;
  color: #f3f7f7;
  font-size: 0.95rem;
}
.resenha-footer {
  margin-top: 12px;
  color: #a3a3a3;
  font-family: 'Archivo', sans-serif;
  font-size: 0.9rem;
}
.likes {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.foto-username {
  background-color: rgba(0, 0, 0, 0.315);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
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
  font-size: 1.3rem;
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

@media (max-width: 800px) {
  .album {
    grid-template-columns: 1fr;
    padding: 4vh 6vw 8vh;
  }

  .coluna-capa {
    max-width: 280px;
    margin: 0 auto;
  }

  .cabecalho-musica {
    flex-direction: column;
  }

  .stats-card {
    align-self: stretch;
    justify-content: center;
  }

  .titulo {
    font-size: 1.9rem;
  }
}
</style>
