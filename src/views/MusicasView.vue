<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import { ref, onMounted } from "vue";

// cada gênero tem músicas com ouvintes e nota
const generos = [
  {
    nome: "Rock",
    musicas: [
      { titulo: "Rock 1", ouvintes: "666k", nota: "4.7/5" },
      { titulo: "Rock 2", ouvintes: "320k", nota: "4.5/5" },
      { titulo: "Rock 3", ouvintes: "210k", nota: "4.2/5" },
      { titulo: "Rock 4", ouvintes: "150k", nota: "4.9/5" },
      { titulo: "Rock 5", ouvintes: "98k", nota: "4.1/5" }
    ]
  },
  {
    nome: "Pop",
    musicas: [
      { titulo: "Pop 1", ouvintes: "500k", nota: "4.6/5" },
      { titulo: "Pop 2", ouvintes: "300k", nota: "4.2/5" },
      { titulo: "Pop 3", ouvintes: "280k", nota: "4.3/5" },
      { titulo: "Pop 4", ouvintes: "180k", nota: "4.8/5" }
    ]
  },
  {
    nome: "Metal",
    musicas: [
      { titulo: "Metal 1", ouvintes: "420k", nota: "4.9/5" },
      { titulo: "Metal 2", ouvintes: "250k", nota: "4.4/5" },
      { titulo: "Metal 3", ouvintes: "190k", nota: "4.7/5" }
    ]
  },
  {
    nome: "Jazz",
    musicas: [
      { titulo: "Jazz 1", ouvintes: "120k", nota: "4.5/5" },
      { titulo: "Jazz 2", ouvintes: "80k", nota: "4.3/5" },
      { titulo: "Jazz 3", ouvintes: "60k", nota: "4.0/5" }
    ]
  }
];

const carrosseis = ref({});

function setRef(el, key) {
  if (el) {
    carrosseis.value[key] = el;
  }
}

function scrollLeft(key) {
  const el = carrosseis.value[key];
  if (el) el.scrollBy({ left: -200, behavior: "smooth" });
}

function scrollRight(key) {
  const el = carrosseis.value[key];
  if (el) el.scrollBy({ left: 200, behavior: "smooth" });
}

// garante loop
function checkLoop(key) {
  const el = carrosseis.value[key];
  if (!el) return;

  const scrollWidth = el.scrollWidth / 2; // metade porque duplicamos
  if (el.scrollLeft <= 0) {
    el.scrollLeft = scrollWidth; // volta pro fim duplicado
  } else if (el.scrollLeft >= scrollWidth * 2 - el.clientWidth) {
    el.scrollLeft = scrollWidth; // volta pro meio
  }
}

onMounted(() => {
  // centraliza nos "itens reais"
  Object.values(carrosseis.value).forEach(el => {
    const half = el.scrollWidth / 2;
    el.scrollLeft = half;
  });
});
</script>

<template>
  <HeaderComp/>
  <div class="page">
    <div class="container">
      <p class="titulo">Músicas</p>
      <section v-for="g in generos" :key="g.nome" class="bloco">
        <div class="bloco-header">
          <p>{{ g.nome }}</p>
          <RouterLink :to="`/genero/rock`" class="vermais">ver mais ></RouterLink> <!-- ${g.nome} ir ao lado do "generos" dps da inegração com obanco--> 
        </div>

        <div class="carrossel">
          <button class="arrow left" @click="scrollLeft(g.nome)">‹</button>
          <div class="cards" :ref="el => setRef(el, g.nome)" @scroll="checkLoop(g.nome)">
            <div v-for="(musica, i) in g.musicas.concat(g.musicas)" :key="i + g.nome" class="card">
              <div class="thumb">{{ musica.titulo }}</div>
              <div class="info">
                <div class="info-item">
                  <!-- Ícone de "ouvintes" -->
                  <i class="pi pi-clipboard"></i>
                  <span>{{ musica.ouvintes }}</span>
                </div>
                <div class="info-item">
                  <!-- Ícone de estrela -->
                  <svg viewBox="0 0 24 24"><path d="M12 2 15 9l7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7Z" fill="#145D91"/></svg>
                  <span>{{ musica.nota }}</span>
                </div>
              </div>
            </div>
          </div>
          <button class="arrow right" @click="scrollRight(g.nome)">›</button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.page {
  background: #0f2626;
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
  font-weight:600;
  margin-bottom: 2.5vh;
  margin-top:2.5vh;
}
.bloco-header {
  display: flex;
  align-items: center;
  gap: 1vh;
  margin-top:5vh;
  margin-bottom: 2.5vh;
  color: #145D91;
  border-bottom: 2px solid #145D91
}
.bloco-header p {
  margin: 0;
  font-size: 3vh;
  font-weight:600;
}
.vermais {
  color: #bdbdbd;
  text-decoration: none;
  font-weight: bold;
  font-size:1.5vh;
}

.carrossel {
  display: flex;
  align-items: center;
  gap: 2.2vh;
}
.cards {
  display: flex;
  gap: 3vh;
  overflow-x: auto;
  flex: 1;
  scroll-behavior: smooth;  
}
.cards::-webkit-scrollbar {
  display: none;
}
.card {
  width: 270px;
  height: 290px;
  border-radius: 12px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  transition: border 0.2s;
  gap: 7px;
}
.thumb:hover {
  border: 2px solid #ffd800;
}
.thumb {
  flex: 1;
  background: #0f1c1c;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  margin: auto;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #bdbdbd;
}
.info-item svg {
  width: 16px;
  height: 16px;
}
.arrow {
  background: transparent;
  border: none;
  color: white;
  font-size: 3vh;
  cursor: pointer;
}
i{
  color: #145D91;
}
</style>
