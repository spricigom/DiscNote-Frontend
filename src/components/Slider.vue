<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Lista de músicas que virão da API
const items = ref([]);

// Função para buscar músicas de rock no iTunes
async function fetchRockSongs() {
  try {
    const res = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: 'metal',
        entity: 'musicTrack',
        limit: 12 // quantidade de músicas
      }
    });
    items.value = res.data.results;
  } catch (err) {
    console.error('Erro ao buscar músicas do iTunes:', err);
    items.value = [];
  }
}

onMounted(() => {
  fetchRockSongs();
});

// funções auxiliares (simulando ouvintes e nota)
function randomOuvintes(index) {
  return `${500 + index * 100}k`;
}
function randomNota() {
  return (Math.random() * 1.5 + 3.5).toFixed(1);
}
</script>

<template>
  <Carousel :items-to-show="4" :wrap-around="true" :snap-align="'start'" class="carousel-custom">
    <Slide v-for="(item, index) in items" :key="item.trackId">
      <div class="carousel-slide">
        <img :src="item.artworkUrl100" :alt="item.trackName" class="sliderImage" />

        <!-- Overlay -->
        <div class="overlay">
          <h3>{{ item.trackName }}</h3>
          <p>{{ item.artistName }}</p>
        </div>

        <div class="avaliacao">
          <div class="av1">
            <p><i class="pi pi-clipboard"></i>{{ randomOuvintes(index) }}</p>
          </div>
          <div class="av2">
            <p><i class="pi pi-star"></i>{{ randomNota() }}/5</p>
          </div>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style scoped>
.carousel-custom {
  width: 70%;
  height: 35vh;
  margin-bottom: 25vh;
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.overlay p {
  color: #c4c4c4;
  font-size: 0.9rem;
  font-family: 'Archivo', sans-serif;
}

.carousel-slide:hover .overlay {
  opacity: 1;
  border: #ecc415 3px solid;
}

.avaliacao {
  height: 15%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
}

.avaliacao p {
  color: white;
  font-family: 'DM Mono', sans-serif;
}

.avaliacao i {
  color: #145d91;
  font-size: 1.2rem;
  margin-right: 0.4rem;
  position: relative;
  top: 0.2vh;
}

.av1, .av2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}

.carousel-custom :deep(.carousel__prev),
.carousel-custom :deep(.carousel__next) {
  transform: translateY(-50%);
  color: white;
  padding: 0.5em;
  width: 3em;
  height: 3em;
}

.carousel-custom :deep(.carousel__prev) {
  left: -5%;
}
.carousel-custom :deep(.carousel__next) {
  right: -5%;
}
</style>
