<script setup>
import Header from '@/components/Header.vue'

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
</script>

<template>
  <Header />
  <main>
    <div class="apresenta">
      <h1>Populares no DiscNote</h1>
      <p>um mix de tudo que está sendo mais falado por aqui</p>
    </div>

    <div class="divisao">
      <h3>Músicas</h3>
      <hr>
    </div>

    <Carousel :items-to-show="1" :wrap-around="true" class="carousel-custom">
      <Slide>
        <div class="carousel-slide">1</div>
      </Slide>
      <Slide>
        <div class="carousel-slide">2</div>
      </Slide>
      <Slide>
        <div class="carousel-slide">3</div>
      </Slide>
      <Slide>
        <div class="carousel-slide">4</div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </main>

  <RouterView />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.apresenta {
  margin-top: 7vh;
  margin-bottom: 4vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3vh;
}

.apresenta h1 {
  font-family: 'Montserat', sans-serif;
  font-weight: 500;
  font-size: 1.9vw;
  color: white;
}

.apresenta p {
  font-family: 'Montserat', sans-serif;
  font-weight: 500;
  font-size: 1.3vw;
  color: #145d91;
}

.divisao {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 65vw;
}

.divisao h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5vw;
  font-weight: 500;
  color: #145d91;
}

.divisao hr {
  width: 100%;
  border: #145d91 2px solid;
}

.carousel-slide {
  width: 13vw;
  height: 30vh;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2vw;
}
</style>
