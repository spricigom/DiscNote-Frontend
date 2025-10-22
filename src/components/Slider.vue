<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { useRouter } from 'vue-router';
import { useResenhaStore } from '@/stores/resenhas';
import { ref, watch } from 'vue';

const resenhaStore = useResenhaStore();

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    default: 'music'
  }
});

const router = useRouter();
function goToItem(item) {
  router.push({ path: '/musica/' + item.trackId });
}

const notas = ref({});
const ouvintes = ref({});

function fetchResenhasParaItem(item) {
  console.log('Buscando resenhas para item:', item);
  const id = item.trackId || item.collectionId;
  const lista = resenhaStore.fetchResenhasPorMusica(id);
  if (lista && lista.length > 0) {
    const soma = lista.reduce((acc, r) => acc + parseFloat(r.nota || 0), 0);
    notas.value[id] = (soma / lista.length).toFixed(1);
    ouvintes.value[id] = lista.length;
  } else {
    notas.value[id] = 0;
  }
}

watch(() => props.items, (newItems) => {
  newItems.forEach(fetchResenhasParaItem);
});
</script>

<template>
  <Carousel :items-to-show="4" :wrap-around="true" :snap-align="'start'" class="carousel-custom">
    <Slide v-for="(item) in items" :key="item.trackId.art || item.collectionId">
      <div class="carousel-slide" @click="goToItem(item)">
        <img :src="item.capa?.replace('100x100bb', '1200x1200bb')" :alt="item.titulo" class="sliderImage" />

        <!-- Overlay -->
        <div class="overlay">
          <h3>{{ item.titulo }}</h3>
          <p>{{ item.artista }}</p>
        </div>

        <div class="avaliacao">
          <div class="av1">
            <p><i class="pi pi-clipboard"></i>{{ ouvintes[item.trackId || item.collectionId] || 0 }}</p>

          </div>
          <div class="av2">
            <p><i class="pi pi-star"></i>{{ notas[item.trackId || item.collectionId] || 0 }}/5</p>
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
  margin-bottom: 12vh;
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

.av1,
.av2 {
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
