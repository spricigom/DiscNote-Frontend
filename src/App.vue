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
          <div class="avaliacao">
            <div class="av1"><p><i class="pi pi-clipboard"></i>666k</p></div>
            <div class="av2"><p><i class="pi pi-star"></i>4.7/5</p></div>
          </div>
        </div>
      </Slide>
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
          <div class="avaliacao">
            <div class="av1"><p><i class="pi pi-clipboard"></i>666k</p></div>
            <div class="av2"><p><i class="pi pi-star"></i>4.7/5</p></div>
          </div>
        </div>
      </Slide>
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
          <div class="avaliacao">
            <div class="av1"><p><i class="pi pi-clipboard"></i>666k</p></div>
            <div class="av2"><p><i class="pi pi-star"></i>4.7/5</p></div>
          </div>
        </div>
      </Slide>
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
          <div class="avaliacao">
            <div class="av1"><p><i class="pi pi-clipboard"></i>666k</p></div>
            <div class="av2"><p><i class="pi pi-star"></i>4.7/5</p></div>
          </div>
        </div>
      </Slide>
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
          <div class="avaliacao">
            <div class="av1"><p><i class="pi pi-clipboard"></i>666k</p></div>
            <div class="av2"><p><i class="pi pi-star"></i>4.7/5</p></div>
          </div>
        </div>
      </Slide>
      <Slide>
        <div class="carousel-slide">
          <img src="#" alt="" class="sliderImage">
          <div class="avaliacao">
            <div class="av1"><p><i class="pi pi-clipboard"></i>666k</p></div>
            <div class="av2"><p><i class="pi pi-star"></i>4.7/5</p></div>
          </div>
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
  margin-bottom: 2%;
}
.carousel-custom{
  width: 70%;
  height: 35vh;
  margin: 0 0.2vw;
}
.carousel-slide{
  width: 85%;
  height: 100%;
}
.sliderImage{
  object-fit: cover;
  width: 100%;
  height: 85%;
  border-radius: 2vw;
  transition: .1s;
  background-color: rgba(0, 0, 0, 0.397);
}
.avaliacao{
  height: 15%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
}
.avaliacao p{
  color: white;
  font-family: 'DM Mono', sans-serif;
}
.avaliacao i{
  color: #145d91;
  font-size: 1.2rem;
  margin-right: 0.4rem;
  position: relative;
  top: .2vh;
}
.av1{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}
.av2{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;

}
.sliderImage:hover{
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
