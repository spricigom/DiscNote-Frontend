<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import Footer from '@/components/Footer.vue';
import Playlists from '@/components/Playlists.vue';
</script>

<template>
  <HeaderComp/>
  <main>
    <div class="playlists-page">
      <h2 class="titulo">Playlists Populares</h2>
      <div class="linha"></div>

      <div class="playlists">
        <Playlists />
        <Playlists />
        <Playlists />
        <Playlists />

      </div>
    </div>

  </main>
  <Footer/>
</template>

<style scoped>
main{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.playlists-page {
  margin-top: 7vh;
  background-color: #162326;
  min-height: 100vh;
  width: 67%;
    margin-bottom: 10vh;

}

.titulo {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.8vw;
  color: #145d91;
  margin-bottom: 0.5vh;
}

.linha {
  height: 2px;
  background-color: #145d91;
  width: 100%;
  margin-bottom: 7vh;
}

/* GRID */
.playlists {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8vw;
}
</style>
