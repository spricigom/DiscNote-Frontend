<script setup>
import { computed, reactive } from 'vue'
import Header from '@/components/HeaderComp.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

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
//const stats = reactive({
//  average: 5.0,
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
        <div class="user">
          <img src="" alt="" />
          <p>
            Resenha escrita por <span>@username</span>
          </p>
        </div>
        <hr />
        <div class="area-titulos">
          <h1 class="titulo">Nome da Musica</h1>
          <h2 class="artista">Nome do Artista</h2>
        </div>


        <div class="info">
          <div class="stat rating">
            <div class="stars" >
              <i class="pi pi-star-fill" style="color: #ecc815;"></i><i class="pi pi-star-fill" style="color: #ecc815;"></i><i class="pi pi-star-fill" style="color: #ecc815;"></i><i class="pi pi-star-fill" style="color: #ecc815;"></i><i class="pi pi-star-fill" style="color: #ecc815;"></i>
              <!-- <span class="avg">{{ stats.average.toFixed(1) }}</span> -->
            </div>
          </div>
          <div class="favorito">
            <i class="pi pi-heart-fill"></i>
          </div>

            <div class="data">
              <p>29/11/2024</p>
            </div>
        </div>

        <div class="texto-resenha">
          <p>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra diam quis leo finibus, vel posuere augue volutpat. Aenean orci lacus, luctus sed faucibus vel, ultrices ut leo. Quisque cursus libero eros, eget fringilla mi convallis a. Nulla porttitor lorem ac diam mollis scelerisque. Praesent ut luctus tellus, id facilisis felis. Donec sit amet arcu vehicula, lacinia eros et, vestibulum risus. Aenean aliquet malesuada tristique. Ut porta diam nisl, eu posuere lorem sodales vel. Curabitur dignissim accumsan volutpat. Integer vitae neque non erat iaculis laoreet. Curabitur auctor vel nisl sed bibendum. Nunc ipsum leo, pharetra tempor leo eget, tincidunt placerat libero. Pellentesque non tortor velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra diam quis leo finibus, vel posuere augue volutpat. Aenean orci lacus, luctus sed faucibus vel, ultrices ut leo. Quisque cursus libero eros, eget fringilla mi convallis a. Nulla porttitor lorem ac diam mollis scelerisque. Praesent ut luctus tellus, id facilisis felis. Donec sit amet arcu vehicula, lacinia eros et, vestibulum risus. Aenean aliquet malesuada tristique. Ut porta diam nisl, eu posuere lorem sodales vel. Curabitur dignissim accumsan volutpat. Integer vitae neque non erat iaculis laoreet. Curabitur auctor vel nisl sed bibendum. Nunc ipsum leo, pharetra tempor leo eget, tincidunt placerat libero. Pellentesque non tortor velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra diam quis leo finibus, vel posuere augue volutpat. Aenean orci lacus, luctus sed faucibus vel, ultrices ut leo. Quisque cursus libero eros, eget fringilla mi convallis a. Nulla porttitor lorem ac diam mollis scelerisque. Praesent ut luctus tellus, id facilisis felis. Donec sit amet arcu vehicula, lacinia eros et, vestibulum risus. Aenean aliquet malesuada tristique. Ut porta diam nisl, eu posuere lorem sodales vel. Curabitur dignissim accumsan volutpat. Integer vitae neque non erat iaculis laoreet. Curabitur auctor vel nisl sed bibendum. Nunc ipsum leo, pharetra tempor leo eget, tincidunt placerat libero. Pellentesque non tortor velit.
          </p>
        </div>
        <div class="curtida-e-comentario">
          <div class="curtida">
            <i class="pi pi-thumbs-up"></i>
            <p>2.500 curtidas</p>
          </div>

        </div>
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
  grid-template-columns: 1.5fr 5fr 1.2fr;
}
.esquerda {
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 7vw;
}
.imgMusica img {
  width: 270px;
  height: 270px;
  background: #00000050;
  border-radius: 25px;
}
.imgMusica {
  margin-top: 10vh;
}
.acoes {
  display: flex;
  flex-direction: column;
}
.acoes button {
  border: 1px solid white;
  background: transparent;
  color: white;
  padding-left: 1vw;
  padding-right: 1vw;
  padding-top: 1vh;
  padding-bottom: 1vh;
  border-radius: 7px;
  font-size: 1.1vw;
  margin-top: 3vh;
}
.direita {
  height: 100vh;
  margin-top: 11vh;
  margin-left: 2.5vw;
}
.user {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.user img {
  background: #00000050;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-left: 0.3vw;
}
.user p {
  font-family: 'Archivo', sans-serif;
  font-size: 1, 1vw;
  margin-left: 0.6vw;
  color: #dadada;
}
.user span {
  color: #ecc815;
}
.direita hr {
  margin-top: 2vh;
  border: 1px solid #145d91;
  margin-bottom: 2vh;
}

.area-titulos .titulo {
  color: white;
  font-size: 8vh;
  font-family: 'Montserat', sans-serif;
  margin: 0;
}
.area-titulos .artista {
  font-family: 'Montserat', sans-serif;
  margin-top: 0;
  color: #d8d8d8;
  font-size: 3.5vh;
}
.rating {
  display: flex;
  flex-direction: row;
}
.rating span{
  font-family: 'Archivo', sans-serif;
  font-size: 1.2vw;
}
.rating .stars {
  font-size: 1.5vw;
  color: #ecc815;
   display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5vw;
}



.info{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.7vw;
  margin-top: 2.5vh;
}
.info i{
  color: #145d91;
  font-size: 1.8vw;

}
.data p{
  font-family: 'Archivo', sans-serif;
  font-size: 1.1vw;
  color: #9e9e9e;
}

.texto-resenha { width: 100%; margin-top: 2vh; }
.texto-resenha p {
  font-family: 'Archivo', sans-serif;
  color: white;
}

.curtida-e-comentario { display:flex; gap:2vw; margin-top:4vh; }
.curtida { display:flex; align-items:center; gap:.5vw; }
.curtida i { color:#145d91; font-size:1.4vw; }
.curtida p { font-family:'DM Mono', sans-serif; color:white; }
</style>
