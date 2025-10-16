<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { useRouter } from 'vue-router';

const props = defineProps({
  albums: {
    type: Array,
    required: true
  }
});

const router = useRouter();

function goToAlbum(album) {
  router.push({ path: '/album/' + album.collectionId });
}
</script>

<template>
  <Carousel :items-to-show="4" :wrap-around="true" :snap-align="'start'" class="carousel-custom">
    <Slide v-for="album in albums" :key="album.collectionId">
      <div class="carousel-slide" @click="goToAlbum(album)">
        <img :src="album.capa" :alt="album.titulo" class="sliderImage" />

        <!-- Overlay -->
        <div class="overlay">
          <h3>{{ album.titulo }}</h3>
          <p>{{ album.artista }}</p>
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
  margin-bottom: 10vh;
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
