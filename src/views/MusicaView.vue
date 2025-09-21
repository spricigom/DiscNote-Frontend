<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const musica = reactive({
  titulo: '',
  artista: '',
  genero: [],
  capa: '',
  previewUrl: ''
})

const stats = reactive({
  totalresenhas: 0,
  average: 0,
  popularity: 0,
})

const resenhas = ref([]) // lista de resenhas, exemplo fictício
const loading = ref(true)

const truncatedResenha = (resenha) => {
  const max = 420
  return resenha.length > max ? resenha.slice(0, max) + '...' : resenha
}

async function fetchMusica() {
  loading.value = true
  try {
    const res = await axios.get('https://itunes.apple.com/lookup', {
      params: {
        id: route.params.id
      }
    })
    const track = res.data.results[0]
    musica.titulo = track.trackName
    musica.artista = track.artistName
    musica.capa = track.artworkUrl100
    musica.previewUrl = track.previewUrl
    musica.genero = [track.primaryGenreName] // exemplo simples
    // fake stats
    stats.totalresenhas = Math.floor(Math.random() * 1000)
    stats.average = (Math.random() * 2 + 3).toFixed(1)
    stats.popularity = Math.floor(Math.random() * 100)
    // fake resenhas
    resenhas.value = [
      { user: 'user1', estrelas: 5, data: '20/08/2025', likes: 120, body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' },
      { user: 'user2', estrelas: 4, data: '18/08/2025', likes: 85, body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum .' }
    ]
  } catch (err) {
    console.error('Erro ao buscar música:', err)
  }
  loading.value = false
}

onMounted(() => {
  fetchMusica()
})
</script>

<template>
  <HeaderComp />
  <main v-if="!loading">
    <div class="musica">
      <div class="left">
        <img :src="musica.capa" alt="Capa da música" class="imgMusica" />
        <button id="escrever">Escrever Resenha</button>
        <audio v-if="musica.previewUrl" :src="musica.previewUrl" controls />
      </div>

      <div class="center">
        <div class="area-titulos">
          <h1 class="titulo">{{ musica.titulo }}</h1>
          <h2 class="artista">{{ musica.artista }}</h2>
        </div>
        <div id="generos">
          <p>Gêneros:</p>
          <div class="tags">
            <button v-for="g in musica.genero" :key="g" class="tag">{{ g }}</button>
          </div>
        </div>
        <section class="resenhas">
          <div id="cabecalho-resenha">
            <h3>Resenhas</h3>
            <a href="#" class="ver-mais">ver todas &gt;</a>
          </div>

          <article class="card-resenha" v-for="(res, i) in resenhas" :key="i">
            <div class="meta">
              <div class="foto-username">
                <img src="#" alt="" />
              </div>
              <div class="meta-text">
                <div class="user-row">
                  <strong>@{{ res.user }}</strong>
                  <div class="estrelas">{{ res.estrelas }} ★★★★★</div>
                  <div class="favorito">
                    <i class="pi pi-heart-fill"></i>
                  </div>
                  <span class="data">{{ res.data }}</span>
                </div>
              </div>
            </div>
            <p class="resenha-body">
              {{ truncatedResenha(res.body) }}
              <a class="ver-maisResenha" href="#">ver mais &gt;</a>
            </p>
            <div class="resenha-footer">
              <span class="likes"><i class="pi pi-thumbs-up"></i> {{ res.likes.toLocaleString() }} curtidas</span>
            </div>
          </article>
        </section>
      </div>

      <aside class="right">
        <div class="stat">
          <div class="big">{{ stats.totalresenhas.toLocaleString() }}</div>
          <div class="label">Total de avaliações</div>
        </div>

        <div class="stat rating">
          <div class="stars">
            ★★★★★ <span class="avg">{{ stats.average }}</span>
          </div>
          <div class="label">Média das avaliações</div>
        </div>

        <div class="stat">
          <div class="big">{{ stats.popularity }}%</div>
          <div class="label">Popularidade</div>
        </div>
      </aside>
    </div>
  </main>

  <div v-else>
    Carregando música...
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
.musica {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 32px;
  height: 100%;
  font-family: 'Archivo' , sans-serif
}
.left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5vh;
}
.imgMusica {
  width: 220px;
  height: 220px;
  background: #0b1a1a;
  border-radius: 18px;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
}
#escrever {
  border: 1.5px solid #fff;
  background: transparent;
  color: #fff;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
}
.center {
  margin-left: 3vh;
  padding-top: 6px;
}
.area-titulos .titulo {
  color: white;
  font-size: 5vh;
  margin: 0;
}
.area-titulos .artista {
  margin-top: 0;
  color: #d8d8d8;
  font-size: 2vh;
}
#generos {
  margin-top: 5vh;
  color: #145d91;
}
#generos p {
  color: #145d91;
  border-bottom: 2px solid #145d91;
  font-size: 2.3vh
}
.tags {
  display: flex;
  gap: 10px;
}
.tag {
  background: transparent;
  border: 2px solid #ecc815;
  color: #ecc815;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1.5vh
}
#cabecalho-resenha {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #145d91;
  padding-bottom: 10px;
  margin-bottom: 1vh;
  margin-top: 3vh;
  color: #145d91;
}
#cabecalho-resenha h3 {
  margin: 0;
  font-size: 3vh
}

.resenha {
  color: white;
  margin-top: 1.5px;
}
.ver-mais {
  color: #145d91;
  text-decoration: none;
}
.foto-username {
  background-color: rgba(0, 0, 0, 0.315);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5vw;
}

.foto-username img {
  object-fit: cover;
}
strong{
  font-size:1.7vh
}
.favorito {
  display: flex;
  flex-direction: row;
  font-size: 1.2vw;
  color: #145d91;
}
.card-resenha {
  margin-top: 2vh;
  padding: 8px 0;
  color: white;
}
.meta {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.user-row {
  display: flex;
  gap: 2.3vh;
  align-items: center;
}
.estrelas {
  color: #ecc815;
  font-weight: 900;
  font-size: 2.5vh;
}
.data {
  color: #9e9e9e;
  font-size: 14px;
}
.resenha-body {
  margin-top: 0.7px;
  line-height: 1.45;
  color: #f3f7f7;
  font-size: 1.8vh
  }
.ver-maisResenha {
  color: #9e9e9e;
  text-decoration: none;
}
.resenha-footer {
  margin-top: 12px;
  color: white;
  font-family: 'Archivo', sans-serif;
  gap:1.5vh
}
.right {
  display: flex;
  flex-direction: column;
  gap: 1vh;
  align-items: flex-end;
  margin-right: 7vh;
  font-family: 'Archivo', sans-serif;
  font-size: 2.5vh
}
.stat {
  background: transparent;
  text-align: right;
}
.stat .big {
  font-size: 3.5vh;
  color: #ecc815;
}
.stat .label {
  color: white;
}
.rating .stars {
  font-size: 3vh;
  color: #ecc815;
}
.rating .avg {
  margin-left: 8px;
  color: #fff;
}
</style>
