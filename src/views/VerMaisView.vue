<script setup>
import { computed, reactive } from 'vue'
import Header from '@/components/HeaderComp.vue'

//const musica = reactive({
//  titulo: 'Nome da Musica',
//  artista: 'nome do artista',
//  genero: ['Alt-Rock', 'Rock', 'Funk-Rock'],
//})

//const stats = reactive({
//totalresenhas: 777314,
// average: 5.0,
//popularity: 86,
//})

//const resenha = reactive({
//  user: 'username',
//  estrelas: '',
//  data: '28/08/2025',
//  likes: 2500,
//  body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra diam quis leo finibus, vel posuere augue volutpat. Aenean orci lacus, luctus sed faucibus vel, ultrices ut leo. Quisque cursus libero eros, eget fringilla mi convallis a. Nulla porttitor lorem ac diam mollis scelerisque. Praesent ut luctus tellus, id facilisis felis. Donec sit amet arcu vehicula, lacinia eros et, vestibulum risus. Aenean aliquet malesuada tristique. Ut porta diam nisl, eu posuere lorem sodales vel. Curabitur dignissim accumsan volutpat. Integer vita...`,
//})

//const truncatedresenha = computed(() => {
//  const max = 420
//  return resenha.body.length > max ? resenha.body.slice(0, max) + '...' : resenha.body
//})
</script>

<template>
  <Header />
  <main>
    <div class="grid">
      <div class="esquerda">
        <div class="imgMusica">
          <img src="" alt="" />
        </div>
        <div class="acoes">
          <button>Escrever Resenha</button>
          <button>Adicionar à Playlist</button>
        </div>
      </div>

      <div class="direita">
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');
main {
  min-height: 100vh;
  background-color: 162326;
}
.grid {
  display: grid;
  grid-template-columns: 1.5fr 5fr 1fr;
}
.esquerda {
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 7vw;
}
.imgMusica img {
  width: 250px;
  height: 250px;
  background: #00000050;
  border-radius: 25px;
}
.imgMusica {
  margin-top: 10vh;
}
.acoes{
  display: flex;
  flex-direction: column;
}
.acoes button{
  border: 1px solid white;
  background: transparent;
  color: white;
  padding-left: 1vw;
  padding-right: 1vw;
  padding-top:1vh ;
  padding-bottom: 1vh;
  border-radius: 7px;
  font-size: 1.1vw;
  margin-top: 3vh;
}
.direita {
  background-color: green;
  height: 100vh;
}
</style>
