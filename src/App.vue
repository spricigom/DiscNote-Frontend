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
    <Carousel :items-to-show="4" :wrap-around="true":snap-align="'start'"  class="carousel-custom">
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
        </div>
      </Slide>
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
        </div>
      </Slide>
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
        </div>
      </Slide>
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
        </div>
      </Slide>
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
        </div>
      </Slide>
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
        </div>
      </Slide>


      <template #addons>
        <Navigation />
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
  width: 67%;
}

.divisao h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5vw;
  font-weight: 500;
  color: #145d91;
}

.divisao hr {
  width: 100%;
  border: #145d91 1px solid;
}
.carousel-custom{
  width: 70vw;
  height: 35vh;
  margin: 0 0.2vw;
}
.carousel-slide{
  width: 85%;
  height: 85%;
  background-color: #0c1414 ;
  border-radius: 2vw;
  transition: .1s;
}
.carousel-slide:hover{
  border: #ecc415 3px solid;
}
.carousel-custom :deep(.carousel__prev), 
.carousel-custom :deep(.carousel__next) {
  transform: translateY(-50%); /* centraliza verticalmente */
  color: white;
  padding: 0.5em;
  width: 3em;
  height: 3em;
}

.carousel-custom :deep(.carousel__prev) {
  left: -5%; /* coloca mais pra fora ou ajusta como quiser */
}

.carousel-custom :deep(.carousel__next) {
  right: -5%;
}

</style>
