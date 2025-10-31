<script setup>
import { computed, reactive } from 'vue'
import Header from '@/components/HeaderComp.vue'
import Footer  from '@/components/Footer.vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router' 

const authStore = useAuthStore()

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
    <div class="esquerda">
      <div class="area-titulos">
        <h1 class="titulo">{{ musica.titulo }}</h1>
        <h2 class="artista">{{ musica.artista }}</h2>
      </div>
      <section class="resenhas">
          <div id="cabecalho-resenha">
            <h3>Resenhas</h3>
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
            <div class="resenha-body">

              <p>{{ truncatedresenha }}</p>
              <RouterLink class="ver-maisResenha" to="/VerMais">ver mais &gt;</RouterLink>
            </div>
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
            <div class="resenha-body">

              <p>{{ truncatedresenha }}</p>
              <RouterLink class="ver-maisResenha" to="/VerMais">ver mais &gt;</RouterLink>
            </div>
            <div class="resenha-footer">
              <span class="likes"
                ><i class="pi pi-thumbs-up"></i> {{ resenha.likes.toLocaleString() }} curtidas</span
              >
            </div>
          </article>
        </section>
    </div>
    <div class="direita">
      <div class="img-e-av">
        <div class="imgMusica"><img src="" alt="" /></div>
        <div class="avaliacoes">
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
    </div>
                  <RouterLink class="ver-maisResenha" to="/VerMais">ver mais &gt;</RouterLink>

  </main>
  <footer><Footer /></footer>
</template>

<style scoped>

main {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 4fr 3fr;
}
.esquerda {
  min-height: 70vh;
  width: 100%;
  margin-top: 7vh;
  margin-left: 10vw;
}
.direita {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  padding-top: 6vh;
}
.area-titulos {
  display: flex;
  flex-direction: column;
}
.area-titulos .titulo {
  color: white;
  font-size: 3vw;
  margin: 0;
  font-family: 'Montserat', sans-serif;
}
.area-titulos .artista {
  margin-top: 0;
  color: #d8d8d8;
  font-size: 1.5vw;
  font-family: 'Archivo', sans-serif;
}
.resenhas {
  margin-top: 2vh;
  margin-bottom: 20vh;
  width: 95%;
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
  font-family: 'Poppins', sans-serif;
}
#cabecalho-resenha h3 {
  margin: 0;
  font-size: 3vh;
}

.card-resenha {
  margin-top: 2vh;
  padding: 8px 0;
  color: white;
}
.meta {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  font-family: 'Archivo', sans-serif;
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
  font-family: 'Archivo', sans-serif;
}
.ver-maisResenha {
  color: #9e9e9e;
  text-decoration: none;
}
.resenha-footer {
  margin-top: 12px;
  color: white;
  font-family: 'DM Mono', sans-serif;
  gap: 1.5vh;
}
.resenha-footer i {
  color: #145d91;
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
.favorito {
  display: flex;
  flex-direction: row;
  font-size: 1.2vw;
  color: #145d91;
}

.imgMusica {
  width: 320px;
  height: 320px;
  background: #00000050;
  border-radius: 25px;
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
  font-family: 'Archivo', sans-serif;
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
.img-e-av{
  display: flex;
  flex-direction: column;
}
.avaliacoes {
  margin-top: 4vh;
}
</style>
