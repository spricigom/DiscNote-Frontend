<script setup>
import Footer from '@/components/Footer.vue';
import HeaderComp from '@/components/HeaderComp.vue';
import Slider from '@/components/Slider.vue';
import AlbumSlider from '@/components/AlbumSlider.vue';
import { ref, onMounted, computed } from 'vue';
import itunesService from '@/services/itunesService';
import Resenha from '@/components/Resenha.vue';
import { useResenhaStore } from '@/stores/resenhas';

const resenhaStore = useResenhaStore();

const items = ref([]);
const resenhas = computed(() => resenhaStore.resenhas.slice(0, 10));

async function fetchRockSongs() {
  try {
    const res = await itunesService.buscarPorGenero('rock', 12);
    items.value = res;
  } catch (err) {
    console.error(`Erro ao buscar gênero rock:`, err);
  }
}

const albums = ref([]);

async function fetchRockAlbums() {
  try {
    const res = await itunesService.buscarPorGenero('rock', 12, 'album');
    albums.value = res;
  } catch (err) {
    console.error(`Erro ao buscar álbuns rock:`, err);
  }
}

onMounted(async () => {
  await resenhaStore.fetchResenhas();
  fetchRockSongs();
  fetchRockAlbums();
});

onMounted(async () => {
  await resenhaStore.fetchResenhas();
  fetchRockSongs();
});
</script>

<template>
  <HeaderComp />

  <main>
    <div class="apresenta">
      <h1>Populares no DiscNote</h1>
      <p>Um mix de tudo que está sendo mais falado por aqui</p>
    </div>

    <div class="divisao">
      <h3>Músicas</h3>
      <hr />
    </div>
    <Slider :items="items" type="music" />

    <div class="divisao">
      <h3>Álbuns</h3>
      <hr>
    </div>
    <AlbumSlider :albums="albums" />

    <div class="divisao">
      <h3>Resenhas</h3>
    </div>
    <div v-if="resenhas.length > 0" class="campo-resenhas">
      <Resenha v-for="resenha in resenhas" :key="resenha.id" :resenha="resenha" />
    </div>
    <p v-else>Nenhuma resenha disponível</p>
  </main>

  <Footer />
</template>
<style scoped>
.slides {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.campo-resenhas {
  display: flex;
  flex-direction: column;
  width: 67%;
}

.corpo {
  height: 100%;
}
.foto-username {
  background-color: rgba(0, 0, 0, 0.315);
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.foto-username img {
  object-fit: cover;
}

.username p {
  font-family: 'Archivo', sans-serif;
  color: #c4c4c4;
  font-weight: 500;
}

.username {
  display: flex;
  flex-direction: row;
  margin-top: 4vh;
  align-items: center;
  gap: 3%;
}

.titulo h4 {
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
