<script setup>

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
</script>

<template>
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
</template>

<style scoped>

.carousel-custom{
  width: 70%;
  height: 35vh;
  margin-bottom:25vh;
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