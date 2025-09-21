<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter();

const generos = ref([
  { nome: "Rock", term: "rock" },
  { nome: "Pop", term: "pop" },
  { nome: "Metal", term: "metal" },
  { nome: "Jazz", term: "jazz" }
]);

const carrosseis = ref({});
const loading = ref(true);
const musicasPorGenero = ref({});

function setRef(el, key) {
  if (el) carrosseis.value[key] = el;
}

function scrollLeft(key) {
  const el = carrosseis.value[key];
  if (el) el.scrollBy({ left: -200, behavior: "smooth" });
}

function scrollRight(key) {
  const el = carrosseis.value[key];
  if (el) el.scrollBy({ left: 200, behavior: "smooth" });
}

function checkLoop(key) {
  const el = carrosseis.value[key];
  if (!el) return;
  const scrollWidth = el.scrollWidth / 2;
  if (el.scrollLeft <= 0) el.scrollLeft = scrollWidth;
  else if (el.scrollLeft >= scrollWidth * 2 - el.clientWidth) el.scrollLeft = scrollWidth;
}

// BUSCA MÚSICAS NO ITUNES
async function fetchMusicas() {
  loading.value = true;
  for (const g of generos.value) {
    try {
      const res = await axios.get("https://itunes.apple.com/search", {
        params: {
          term: g.term,
          entity: "musicTrack",
          limit: 10
        }
      });
      musicasPorGenero.value[g.nome] = res.data.results.map(track => ({
        trackId: track.trackId, // importante para a rota da música
        titulo: track.trackName,
        artista: track.artistName,
        capa: track.artworkUrl100,
        ouvintes: `${Math.floor(Math.random() * 500 + 50)}k`,
        nota: `${(Math.random() * 1.5 + 3.5).toFixed(1)}/5`,
        previewUrl: track.previewUrl
      }));
    } catch (err) {
      console.error(`Erro ao buscar ${g.nome}:`, err);
      musicasPorGenero.value[g.nome] = [];
    }
  }
  loading.value = false;

  Object.values(carrosseis.value).forEach(el => {
    if (el) el.scrollLeft = el.scrollWidth / 2;
  });
}

onMounted(() => {
  fetchMusicas();
});

function irParaMusica(musica) {
  router.push({ name: 'Musica', params: { id: musica.trackId } });
}
</script>

<template>
  <HeaderComp/>
  <div class="page">
    <div class="container">
      <p class="titulo">Músicas</p>
      <div v-if="loading">Carregando músicas...</div>

      <section v-for="g in generos" :key="g.nome" class="bloco" v-else>
        <div class="bloco-header">
          <p>{{ g.nome }}</p>
          <RouterLink :to="`/genero/${g.term}`" class="vermais">ver mais ></RouterLink>
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
              <!-- CAPA DO ÁLBUM -->
              <img :src="musica.capa" alt="Capa do álbum" class="thumb"/>
              <div class="info">
                <strong>{{ musica.titulo }}</strong>
                <p>{{ musica.artista }}</p>
                <div class="info-item">
                  <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5Z" fill="#145D91"/></svg>
                  <span>{{ musica.ouvintes }}</span>
                </div>
                <div class="info-item">
                  <svg viewBox="0 0 24 24"><path d="M12 2 15 9l7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7Z" fill="#145D91"/></svg>
                  <span>{{ musica.nota }}</span>
                </div>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
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
  gap: 1vh;
  margin-top:5vh;
  margin-bottom: 2.5vh;
  color: #145D91;
  border-bottom: 2px solid #145D91
}
.bloco-header p {
  margin: 0;
  font-size: 3vh;
  font-weight:600;
}
.vermais {
  color: #bdbdbd;
  text-decoration: none;
  font-weight: bold;
  font-size:1.5vh;
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
.cards::-webkit-scrollbar {
  display: none;
}
.card {
  width: 200px;
  height: 230px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  transition: border 0.2s;
  cursor: pointer;
}
.thumb:hover {
  border: 2px solid #ffd800;
}
.thumb {
  flex: 1;
  background: #0f1c1c;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
  font-size: 0.9rem;
  margin: auto;
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
