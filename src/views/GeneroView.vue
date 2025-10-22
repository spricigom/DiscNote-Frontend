<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import HeaderComp from '@/components/HeaderComp.vue';
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useResenhaStore } from '@/stores/resenhas';

const route = useRoute();
const router = useRouter();
const resenhaStore = useResenhaStore();

const generoPrincipal = ref(route.params.nome);
const generos = ref([]);
const musicasPorGenero = ref({});
const loading = ref(true);

const notas = ref({});
const ouvintes = ref({});

// Navegar para a página da música
function irParaMusica(musica) {
  router.push({ name: "Musica", params: { id: musica.trackId } });
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

  generos.value = mapa[generoPrincipal.value] || [];
}

// Buscar resenhas e calcular notas e ouvintes
function fetchResenhasParaItem(item) {
  const id = item.trackId || item.collectionId;
  const lista = resenhaStore.fetchResenhasPorMusica(id);
  if (lista && lista.length > 0) {
    const soma = lista.reduce((acc, r) => acc + parseFloat(r.nota || 0), 0);
    notas.value[id] = (soma / lista.length).toFixed(1);
    ouvintes.value[id] = lista.length;
  } else {
    notas.value[id] = 0;
    ouvintes.value[id] = 0;
  }
}

// Busca músicas para cada subgênero
async function fetchMusicas() {
  loading.value = true;
  for (const g of generos.value) {
    try {
      const res = await axios.get("https://itunes.apple.com/search", {
        params: { term: g.term, entity: "musicTrack", limit: 8 }
      });
      musicasPorGenero.value[g.nome] = res.data.results.map(track => ({
        trackId: track.trackId,
        titulo: track.trackName,
        artista: track.artistName,
        capa: track.artworkUrl100,
        previewUrl: track.previewUrl
      }));

      // Buscar resenhas para cada música
      musicasPorGenero.value[g.nome].forEach(fetchResenhasParaItem);
    } catch (err) {
      console.error(`Erro ao buscar ${g.nome}:`, err);
      musicasPorGenero.value[g.nome] = [];
    }
  }
  loading.value = false;
}

// Recarregar ao entrar ou mudar rota
onMounted(() => {
  carregarSubgeneros();
  fetchMusicas();
});
watch(() => route.params.nome, (novo) => {
  generoPrincipal.value = novo;
  carregarSubgeneros();
  fetchMusicas();
});
</script>

<template>
  <HeaderComp/>
  <div class="page">
    <div class="container">
      <p class="titulo">{{ generoPrincipal }}</p>
      <div v-if="loading" style="color:white;">Carregando músicas...</div>

      <section v-else v-for="g in generos" :key="g.nome" class="bloco">
        <div class="bloco-header">
          <p>{{ g.nome }}</p>
        </div>

        <Carousel :items-to-show="4" :wrap-around="true" :snap-align="'start'" class="carousel-custom">
          <Slide v-for="musica in musicasPorGenero[g.nome]" :key="musica.trackId">
            <div class="carousel-slide" @click="irParaMusica(musica)">
              <img :src="musica.capa?.replace('100x100bb', '1200x1200bb')" :alt="musica.titulo" class="sliderImage" />

              <!-- Overlay -->
              <div class="overlay">
                <h3>{{ musica.titulo }}</h3>
                <p>{{ musica.artista }}</p>
              </div>

              <div class="avaliacao">
                <div class="av1">
                  <p><i class="pi pi-clipboard"></i>{{ ouvintes[musica.trackId] || 0 }}</p>
                </div>
                <div class="av2">
                  <p><i class="pi pi-star"></i>{{ notas[musica.trackId] || 0 }}/5</p>
                </div>
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=DM+Mono&family=Archivo&display=swap');

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
.carousel-custom {
  width: 100%;
  height: 35vh;
  margin-bottom: 8vh;
}
.carousel-slide {
  position: relative;
  width: 85%;
  height: 100%;
  overflow: hidden;
}
.sliderImage {
  object-fit: cover;
  width: 100%;
  height: 85%;
  border-radius: 2vw;
  transition: 0.1s;
  background-color: rgba(0, 0, 0, 0.397);
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 85%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.3s ease;
  border-radius: 2vw;
}
.overlay h3 {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}
.overlay p {
  color: #c4c4c4;
  font-size: 0.9rem;
}
.carousel-slide:hover .overlay {
  opacity: 1;
  border: #ecc415 3px solid;
  cursor: pointer;
}
.avaliacao {
  height: 15%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
}
.av1,
.av2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}
.avaliacao i {
  color: #145d91;
  font-size: 1.2rem;
  margin-right: 0.4rem;
  position: relative;
  top: 0.2vh;
}
.carousel-custom :deep(.carousel__prev),
.carousel-custom :deep(.carousel__next) {
  transform: translateY(-50%);
  color: white;
  padding: 0.5em;
  width: 3em;
  height: 3em;
}
.carousel-custom :deep(.carousel__prev) { left: -5%; }
.carousel-custom :deep(.carousel__next) { right: -5%; }
</style>
