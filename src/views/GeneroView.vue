<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import { ref, onMounted, watch } from "vue"
import axios from "axios"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const generoPrincipal = ref(route.params.nome) // ex: "rock"
const generos = ref([]) // subgêneros
const carrosseis = ref({})
const musicasPorGenero = ref({})
const loading = ref(true)

function irParaMusica(musica) {
  router.push({ name: "Musica", params: { id: musica.trackId } })
}

function setRef(el, key) { if (el) carrosseis.value[key] = el }
function scrollLeft(key) { const el = carrosseis.value[key]; if (el) el.scrollBy({ left: -200, behavior: "smooth" }) }
function scrollRight(key) { const el = carrosseis.value[key]; if (el) el.scrollBy({ left: 200, behavior: "smooth" }) }
function checkLoop(key) {
  const el = carrosseis.value[key]
  if (!el) return
  const scrollWidth = el.scrollWidth / 2
  if (el.scrollLeft <= 0) el.scrollLeft = scrollWidth
  else if (el.scrollLeft >= scrollWidth * 2 - el.clientWidth) el.scrollLeft = scrollWidth
}

// Definir subgêneros conforme o gênero principal
function carregarSubgeneros() {
  const mapa = {
    rock: [
      { nome: "Hard Rock", term: "hard rock" },
      { nome: "Indie Rock", term: "indie rock" },
      { nome: "Surf Rock", term: "surf rock" },
      { nome: "Grunge", term: "grunge" }
    ],
    pop: [
      { nome: "K-pop", term: "kpop" },
      { nome: "Synthpop", term: "synthpop" },
      { nome: "Indie Pop", term: "indie pop" },
      { nome: "Electropop", term: "electropop" }
    ],
    jazz: [
      { nome: "Smooth Jazz", term: "smooth jazz" },
      { nome: "Bebop", term: "bebop" },
      { nome: "Swing", term: "swing jazz" },
      { nome: "Latin Jazz", term: "latin jazz" }
    ],
    metal: [
      { nome: "Heavy Metal", term: "heavy metal" },
      { nome: "Death Metal", term: "death metal" },
      { nome: "Power Metal", term: "power metal" },
      { nome: "Black Metal", term: "black metal" }
    ]
  }

  generos.value = mapa[generoPrincipal.value] || []
}

// Busca músicas para cada subgênero
async function fetchMusicas() {
  loading.value = true
  for (const g of generos.value) {
    try {
      const res = await axios.get("https://itunes.apple.com/search", {
        params: { term: g.term, entity: "musicTrack", limit: 8 }
      })
      musicasPorGenero.value[g.nome] = res.data.results.map(track => ({
        trackId: track.trackId,
        titulo: track.trackName,
        artista: track.artistName,
        capa: track.artworkUrl100,
        ouvintes: `${Math.floor(Math.random() * 500 + 50)}k`,
        nota: `${(Math.random() * 1.5 + 3.5).toFixed(1)}/5`,
        previewUrl: track.previewUrl
      }))
    } catch (err) {
      console.error(`Erro ao buscar ${g.nome}:`, err)
      musicasPorGenero.value[g.nome] = []
    }
  }
  loading.value = false

  Object.values(carrosseis.value).forEach(el => {
    if (el) el.scrollLeft = el.scrollWidth / 2
  })
}

// Recarregar ao entrar ou mudar rota
onMounted(() => {
  carregarSubgeneros()
  fetchMusicas()
})
watch(() => route.params.nome, (novo) => {
  generoPrincipal.value = novo
  carregarSubgeneros()
  fetchMusicas()
})
</script>

<template>
  <HeaderComp/>
  <div class="page">
    <div class="container">
      <p class="titulo">{{ generoPrincipal }}</p>
      <div v-if="loading" style="color:white;">Carregando músicas...</div>

      <section v-for="g in generos" :key="g.nome" class="bloco" v-else>
        <div class="bloco-header">
          <p>{{ g.nome }}</p>
        </div>

        <div class="carrossel">
          <button class="arrow left" @click="scrollLeft(g.nome)">‹</button>
          <div class="cards" :ref="el => setRef(el, g.nome)" @scroll="checkLoop(g.nome)">
            <div
              v-for="(musica, i) in (musicasPorGenero[g.nome] || []).concat(musicasPorGenero[g.nome] || [])"
              :key="i + g.nome"
              class="card"
              @click="irParaMusica(musica)"
            >
              <img :src="musica.capa" alt="Capa do álbum" class="thumb" />
              <div class="info" style="flex-direction: column; gap: 4px;">
                <strong>{{ musica.titulo }}</strong>
                <p style="font-size:0.8rem;color:#bdbdbd;margin:0;">{{ musica.artista }}</p>
              </div>
            </div>
          </div>
          <button class="arrow right" @click="scrollRight(g.nome)">›</button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  background: #0f2626;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-family: "Poppins", sans-serif;
}
.container {
  width: 100%;
  max-width: 70%;
  padding: 24px;
}
.titulo {
  font-size: 5vh;
  font-weight:600;
  margin-bottom: 2.5vh;
  margin-top:2.5vh;
}
.bloco-header {
  display: flex;
  align-items: center;
  margin-top:5vh;
  margin-bottom: 2.5vh;
  color: #145D91;
  border-bottom: 2px solid #145D91;
}
.bloco-header p {
  margin: 0;
  font-size: 3vh;
  font-weight:600;
}
.carrossel {
  display: flex;
  align-items: center;
  gap: 2.2vh;
}
.cards {
  display: flex;
  gap: 3vh;
  overflow-x: auto;
  flex: 1;
  scroll-behavior: smooth;
}
.cards::-webkit-scrollbar { display: none; }
.card {
  width: 200px;
  height: 300px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  background:#0a1a1a;
}
.thumb {
  width: 100%;
  height: 140px;
  border-radius: 6px;
  border: 2px solid transparent;
  object-fit: cover;
}
.thumb:hover {
  border-color: #ffd800;
}
.info {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  margin-top: 6px;
  font-size: 0.9rem;
  flex:1;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #bdbdbd;
}
.info-item svg {
  width: 16px;
  height: 16px;
}
.arrow {
  background: transparent;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
}
</style>
