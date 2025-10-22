<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
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

const truncatedResenha = (resenha) => {
  if (!resenha) return ''
  const max = 420
  return resenha.length > max ? resenha.slice(0, max) + '...' : resenha
}

const minhaResenha = computed(() => {
  if (!authStore.isLogged) return null
  return resenhas.value.find((r) => r.usuario?.id === authStore.user.id) || null
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
      <div class="left">
        <img :src="musica.capa" alt="Capa da música" class="imgMusica" />
        <button @click="goToResenha()" id="escrever" :disabled="minhaResenha">
          {{ minhaResenha ? 'Resenha publicada' : 'Escrever Resenha' }}
        </button>
        <button @click="deleteResenha()" id="escrever" v-if="minhaResenha">
          Excluir minha resenha
        </button>

        <audio v-if="musica.previewUrl" :src="musica.previewUrl" controls />
      </div>

      <div class="center">
        <div class="area-titulos">
          <h1 class="titulo">{{ musica.titulo }}</h1>
          <h2 class="artista">{{ musica.artista }}</h2>
        </div>
        <div id="escrita">
          <p>Resenha escrita por <a href="">user</a></p>
        </div>
        <section class="resenhas">
          <div id="cabecalho-resenha">
            <h2>Nome da Música</h2>
            <h3>nome do artista</h3>
          </div>

          <article class="card-resenha" v-for="(res, i) in resenhas" :key="i">
            <p class="resenha-body">
              {{ truncatedResenha(res.texto) }}
            </p>
            <div class="resenha-footer">
              <span class="likes"
                ><i class="pi pi-thumbs-up"></i>
                {{ res.curtidas_count.toLocaleString() }} curtidas</span
              >
            </div>
          </article>
        </section>
      </div>
    </div>
  </main>

  <div v-else>Carregando música...</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.musica {
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 40px;
  height: 100%;
  font-family: 'Archivo', sans-serif;
}

.left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:1.5vh
}

.imgMusica {
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
  padding-top: 6px;
  max-width: 80%;
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

#escrita {
  margin-top: 5vh;
  color: #145d91;
  gap: px;
}

#escrita p {
  color: #dadada;
  border-bottom: 2px solid #145d91;
  font-size: 2.3vh;
}
#escrita a {
  color: #ecc815;
}

#cabecalho-resenha {
  margin-top: 5px;
  padding-bottom: 10px;
  margin-bottom: 1vh;
}

#cabecalho-resenha h2 {
  margin: 0;
  font-size: 5vh;
  color: #FFFF;
}

#cabecalho-resenha h3{
  font-size: 2vh;
  color: #D8D8D8
}

.resenha {
  color: white;
  margin-top: 1.5px;
}

.ver-mais {
  color: #145d91;
  text-decoration: none;
}


.card-resenha {
  margin-top: 2vh;
  padding: 8px 0;
  color: white;
}
.resenha-body {
  margin-top: 0.7px;
  line-height: 1.45;
  color: #f3f7f7;
  font-size: 1.8vh;
}


.resenha-footer {
  margin-top: 12px;
  color: white;
  font-family: 'Archivo', sans-serif;
  gap: 1.5vh;
}
</style>
