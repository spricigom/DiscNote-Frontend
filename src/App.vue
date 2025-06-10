<script setup>
import Header from '@/components/Header.vue'
import Slider from '@/components/Slider.vue'


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
    <Slider />

    <div class="divisao">
      <h3>Albuns</h3>
      <hr>
    </div>
    <Slider />

    <div class="divisao">
      <h3>Resenhas</h3>
      <hr>
    </div>
    <div class="resenha">
      <div class="foto-resenha">
        <img src="#" alt="">
      </div>

      <div class="corpo">
        <div class="titulo">
          <h1>Nome da Música</h1>
          <h4>nome do artista</h4>
        </div>

        <div class="username">
          <div class="foto-username">
            <img src="#" alt="">
          </div>
          <p>@username</p>
        </div>



      </div>

    </div>

  </main>

  <RouterView />
</template>

<style scoped>
.corpo{
  height: 100%;
}
.foto-username{
  background-color: rgba(0, 0, 0, 0.315);
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.foto-username img{
  object-fit: cover;
}
.username p{
  font-family: 'Archivo', sans-serif;
  color: #c4c4c4;
  font-weight: 500;
}
.username{
  display: flex;
  flex-direction:row;
  margin-top: 4vh;
  align-items: center;
  gap: 3%;
}
.titulo h4{
  font-family: 'Archivo', sans-serif;
  color: white;
  font-weight: 400;
}
.titulo h1 {
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: 600;
}

.foto-resenha {
  background-color: rgba(0, 0, 0, 0.308);
  width: 250px;
  height: 250px;
  border-radius: 2vw;
  display: flex;

}

.resenha {
  width: 67%;
  height: 50vh;
  display: flex;
  flex-direction: row;
  margin-bottom: 10vh;
  gap: 2vw;
}


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
</style>
