<script setup>
import { computed, reactive } from 'vue'
import Header from '@/components/HeaderComp.vue'
import Footer from '@/components/Footer.vue'
const musica = reactive({
  titulo: 'Nome da Musica',
  artista: 'nome do artista',
  genero: ['Alt-Rock', 'Rock', 'Funk-Rock'],
})

const stats = reactive({
  totalresenhas: 777314,
  average: 5.0,
  popularity: 86,
})

const resenha = reactive({
  user: 'username',
  estrelas: '',
  data: '28/08/2025',
  likes: 2500,
  body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra diam quis leo finibus, vel posuere augue volutpat. Aenean orci lacus, luctus sed faucibus vel, ultrices ut leo. Quisque cursus libero eros, eget fringilla mi convallis a. Nulla porttitor lorem ac diam mollis scelerisque. Praesent ut luctus tellus, id facilisis felis. Donec sit amet arcu vehicula, lacinia eros et, vestibulum risus. Aenean aliquet malesuada tristique. Ut porta diam nisl, eu posuere lorem sodales vel. Curabitur dignissim accumsan volutpat. Integer vita...`,
})

const truncatedresenha = computed(() => {
  const max = 420
  return resenha.body.length > max ? resenha.body.slice(0, max) + '...' : resenha.body
})
</script>

<template>
  <Header />
  <main>
    <div class="musica">
      <div class="left">
        <div class="imgMusica"><img src="" alt="" /></div>

        <div class="acoes">
          <button>Escrever Resenha</button>
          <button>Adicionar à Playlist</button>
        </div>
      </div>

      <div class="direita">
        <div class="cima">
          <div class="center">
            <div class="area-titulos">
              <h1 class="titulo">{{ musica.titulo }}</h1>
              <h2 class="artista">{{ musica.artista }}</h2>
            </div>
            <div id="generos">
              <p>Generos:</p>
              <div class="tags">
                <button v-for="g in musica.genero" :key="g" class="tag">{{ g }}</button>
              </div>
            </div>
          </div>

          <div class="right">
            <div class="stat">
              <div class="big">{{ stats.totalresenhas.toLocaleString() }}</div>
              <div class="label">Total de avaliacoes</div>
            </div>

            <div class="stat rating">
              <div class="stars">
                ★★★★★ <span class="avg">{{ stats.average.toFixed(1) }}</span>
              </div>
              <div class="label">Media das avaliacoes</div>
            </div>

            <div class="stat">
              <div class="big">{{ stats.popularity }}%</div>
              <div class="label">Popularidade</div>
            </div>
          </div>
        </div>

        <section class="resenhas">
          <div id="cabecalho-resenha">
            <h3>Resenhas</h3>
            <a href="/VerMaisResenhas" class="ver-mais">ver todas &gt;</a>
          </div>

          <article class="card-resenha">
            <div class="meta">
              <div class="foto-username">
                <img src="#" alt="" />
              </div>
              <div class="meta-text">
                <div class="user-row">
                  <strong>@{{ resenha.user }}</strong>
                  <div class="estrelas">{{ resenha.estrelas }} ★★★★★</div>
                  <div class="favorito">
                    <i class="pi pi-heart-fill"></i>
                  </div>
                  <span class="data">{{ resenha.data }}</span>
                </div>
              </div>
            </div>
            <p class="resenha-body">
              {{ truncatedresenha }}
              <a class="ver-maisResenha" href="/VerMais">ver mais &gt;</a>
            </p>
            <div class="resenha-footer">
              <span class="likes"
                ><i class="pi pi-thumbs-up"></i> {{ resenha.likes.toLocaleString() }} curtidas</span
              >
            </div>
          </article>
          <article class="card-resenha">
            <div class="meta">
              <div class="foto-username">
                <img src="#" alt="" />
              </div>
              <div class="meta-text">
                <div class="user-row">
                  <strong>@{{ resenha.user }}</strong>
                  <div class="estrelas">{{ resenha.estrelas }} ★★★★★</div>
                  <div class="favorito">
                    <i class="pi pi-heart-fill"></i>
                  </div>
                  <span class="data">{{ resenha.data }}</span>
                </div>
              </div>
            </div>
            <p class="resenha-body">
              {{ truncatedresenha }}
              <a class="ver-maisResenha" href="/VerMais">ver mais &gt;</a>
            </p>
            <div class="resenha-footer">
              <span class="likes"
                ><i class="pi pi-thumbs-up"></i> {{ resenha.likes.toLocaleString() }} curtidas</span
              >
            </div>
          </article>
        </section>
      </div>
    </div>
  </main>
  <footer><Footer /></footer>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');

.direita {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin-left: 4vw;
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
.musica {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Archivo', sans-serif;
  display: grid;
  grid-template-columns: 1.5fr 5fr 1fr;
}
.cima {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 7vh;
}
.left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5vh;
  height: 70vh;
  margin-left: 7vw;
  margin-top: 7vh;
}
.right {
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  font-family: 'Archivo', sans-serif;
  font-size: 2.5vh;
  margin-left: 7vh;
}
.center {
  padding-top: 6px;
  width: 40vw;
}
.imgMusica {
  width: 270px;
  height: 270px;
  background: #00000050;
  border-radius: 25px;
}
#escrever {
  border: 1.5px solid #fff;
  background: transparent;
  color: #fff;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
}
.resenhas {
  margin-top: 2vh;
  width: 50vw;
}

.area-titulos .titulo {
  color: white;
  font-size: 8vh;
  margin: 0;
}
.area-titulos .artista {
  margin-top: 0;
  color: #d8d8d8;
  font-size: 3.5vh;
}
#generos {
  margin-top: 5vh;
  color: #145d91;
}
#generos p {
  color: #145d91;
  border-bottom: 2px solid #145d91;
  font-size: 1.4vw;
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
  margin-top: 1.5vh;
  font-size: 1.1vw;
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
  font-size: 3vh;
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
strong {
  font-size: 1.7vh;
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
  font-size: 1.8vh;
}
.ver-maisResenha {
  color: #9e9e9e;
  text-decoration: none;
}
.resenha-footer {
  margin-top: 12px;
  color: white;
  font-family: 'Archivo', sans-serif;
  gap: 1.5vh;
}

.stat {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.stat .big {
  font-size: 2vw;
  color: #ecc815;
  font-family: 'DM Mono', sans-serif;
}
.stat .label {
  color: white;
  font-size: 1.6vw;
}
.rating {
  justify-content: center;
}
.rating .stars {
  font-size: 1.8vw;
  color: #ecc815;
}
.rating .avg {
  margin-left: 5px;
  color: #ecc815;
  font-size: 2vw;
  font-family: 'DM Mono', sans-serif;
}
</style>
