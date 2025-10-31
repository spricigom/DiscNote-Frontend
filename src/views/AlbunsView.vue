<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import HeaderComp from '@/components/HeaderComp.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useResenhaStore } from '@/stores/resenhas';

const router = useRouter();
const resenhaStore = useResenhaStore();

const generos = ref([
  { nome: "Rock", term: "rock" },
  { nome: "Pop", term: "pop" },
  { nome: "Metal", term: "metal" },
  { nome: "Jazz", term: "jazz" }
]);

const albunsPorGenero = ref({});
const notas = ref({});
const ouvintes = ref({});
const loading = ref(true);

// calcula notas e ouvintes
function fetchResenhasParaAlbum(album) {
  const id = album.collectionId;
  const lista = resenhaStore.fetchResenhasPorMusica(id);

  if (lista && lista.length > 0) {
    const soma = lista.reduce((acc, r) => acc + parseFloat(r.nota || 0), 0);
    notas.value[id] = (soma / lista.length).toFixed(1);
    ouvintes.value[id] = lista.length;
  } else {
    notas.value[id] = 0;
    ouvintes.value[id] = 0;
  }
}

// busca álbuns por gênero
async function fetchAlbuns() {
  loading.value = true;
  for (const g of generos.value) {
    try {
      const res = await axios.get("https://itunes.apple.com/search", {
        params: { term: g.term, entity: "album", limit: 10 }
      });

      albunsPorGenero.value[g.nome] = res.data.results.map(album => ({
        collectionId: album.collectionId,
        titulo: album.collectionName,
        artista: album.artistName,
        capa: album.artworkUrl100
      }));

      albunsPorGenero.value[g.nome].forEach(fetchResenhasParaAlbum);
    } catch (err) {
      console.error(`Erro ao buscar álbuns de ${g.nome}:`, err);
      albunsPorGenero.value[g.nome] = [];
    }
  }
  loading.value = false;
}

onMounted(fetchAlbuns);

function irParaAlbum(album) {
  if (!album?.collectionId) return;
  router.push({ name: 'Album', params: { id: album.collectionId } });
}
</script>

<template>
  <HeaderComp />

  <div class="page">
    <div class="container">
      <p class="titulo">Álbuns</p>

      <div v-if="loading">Carregando álbuns...</div>

      <template v-else>
        <section v-for="g in generos" :key="g.nome" class="bloco">
          <div class="bloco-header">
            <p>{{ g.nome }}</p>
            <RouterLink :to="`/genero/${g.term}/albuns`" class="vermais">ver mais &gt;</RouterLink>
          </div>

          <Carousel :items-to-show="4" :wrap-around="true" :snap-align="'start'" class="carousel-custom">
            <Slide v-for="album in albunsPorGenero[g.nome]" :key="album.collectionId">
              <div class="carousel-slide" @click="irParaAlbum(album)">
                <img :src="album.capa?.replace('100x100bb', '1200x1200bb')" :alt="album.titulo" class="sliderImage" />

                <div class="overlay">
                  <h3>{{ album.titulo }}</h3>
                  <p>{{ album.artista }}</p>
                </div>

                <div class="avaliacao">
                  <div class="av1">
                    <p><i class="pi pi-clipboard"></i>{{ ouvintes[album.collectionId] || 0 }}</p>
                  </div>
                  <div class="av2">
                    <p><i class="pi pi-star"></i>{{ notas[album.collectionId] || 0 }}/5</p>
                  </div>
                </div>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </section>
      </template>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=DM+Mono&family=Archivo&display=swap');

.page {
  background: #162326;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-family: "Poppins", sans-serif;
}
.container {
  width: 100%;
  max-width: 70%;
  padding: 24px;
}
.titulo {
  font-size: 5vh;
  font-weight: 600;
  margin-bottom: 2.5vh;
  margin-top: 2.5vh;
}
.bloco-header {
  display: flex;
  align-items: center;
  gap: 1vh;
  margin-top: 5vh;
  margin-bottom: 2.5vh;
  color: #145D91;
  border-bottom: 2px solid #145D91;
}
.bloco-header p {
  margin: 0;
  font-size: 3vh;
  font-weight: 600;
}
.vermais {
  color: #bdbdbd;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5vh;
}
.carousel-custom {
  width: 100%;
  height: 35vh;
  margin-bottom: 8vh;
}
.carousel-slide {
  position: relative;
  width: 85%;
  height: 100%;
  overflow: hidden;
}
.sliderImage {
  object-fit: cover;
  width: 100%;
  height: 85%;
  border-radius: 2vw;
  transition: 0.1s;
  background-color: rgba(0, 0, 0, 0.397);
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 85%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.3s ease;
  border-radius: 2vw;
}
.overlay h3 {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}
.overlay p {
  color: #c4c4c4;
  font-size: 0.9rem;
}
.carousel-slide:hover .overlay {
  opacity: 1;
  border: #ecc415 3px solid;
  cursor: pointer;
}
.avaliacao {
  height: 15%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
}
.av1,
.av2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}
.avaliacao i {
  color: #145d91;
  font-size: 1.2rem;
  margin-right: 0.4rem;
  position: relative;
  top: 0.2vh;
}
.carousel-custom :deep(.carousel__prev),
.carousel-custom :deep(.carousel__next) {
  transform: translateY(-50%);
  color: white;
  padding: 0.5em;
  width: 3em;
  height: 3em;
}
.carousel-custom :deep(.carousel__prev) { left: -5%; }
.carousel-custom :deep(.carousel__next) { right: -5%; }
</style>
