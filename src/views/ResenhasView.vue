<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import Footer from '@/components/Footer.vue'
import Resenha from '@/components/Resenha.vue'
import { useResenhaStore } from '@/stores/resenhas'
import { onMounted, computed } from 'vue'

const resenhaStore = useResenhaStore()

const resenhas = computed(() => resenhaStore.resenhas.slice(0, 10))

onMounted(async () => {
  await resenhaStore.fetchResenhas()
})
</script>

<template>
  <HeaderComp />

  <main class="resenhas-polares">
    <div class="titulo-secao">
      <h2>Resenhas Populares</h2>
      <hr />
    </div>

    <div v-if="resenhas.length > 0" class="lista-resenhas">
      <Resenha
        v-for="resenha in resenhas"
        :key="resenha.id"
        :resenha="resenha"
      />
    </div>

    <p v-else class="sem-resenhas">Nenhuma resenha encontrada</p>
  </main>

  <Footer />
</template>

<style scoped>
.resenhas-polares {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #162326;
  min-height: 100vh;
  padding: 7vh 0;
  color: white;
}

.titulo-secao {
  width: 67%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-bottom: 6vh;
}

.titulo-secao h2 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.8vw;
  color: #145d91;
  margin-bottom: 0.5vh;
}

.titulo-secao hr {
  width: 100%;
  border: #145d91 1px solid;
}

.lista-resenhas {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8vh;
  width: 67%;
}

.sem-resenhas {
  font-family: 'Archivo', sans-serif;
  color: #c4c4c4;
  font-size: 1.1vw;
  margin-top: 5vh;
}
</style>
