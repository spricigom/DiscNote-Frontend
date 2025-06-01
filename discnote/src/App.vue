<script setup>
import { ref } from 'vue'

const showSubmenu = ref(false)

function toggleSubmenu() {
  showSubmenu.value = !showSubmenu.value
}
</script>

<template>
  <header>
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo DiscNote">
    </div>

    <nav>
      <div class="nav-item" @click="toggleSubmenu">
        <RouterLink to="#">Explorar <span><i class="pi pi-angle-down"></i></span></RouterLink>
        <div class="submenu" v-if="showSubmenu">
          <RouterLink to="#">Álbuns</RouterLink>
          <hr>
          <RouterLink to="#">Musicas</RouterLink>
          <hr>
          <RouterLink to="#">Artistas</RouterLink>
          <hr>
          <RouterLink to="#">Generos</RouterLink>
        </div>
      </div>
      <RouterLink to="#">Playlists</RouterLink>
      <RouterLink to="#">Resenhas</RouterLink>
    </nav>

    <div class="right">
      <span class="pi pi-search"></span>
      <span class="pi pi-plus"></span>
      <div class="foto-user">
        <img src="@/assets/fotoPerfil.jpeg" alt="Foto de perfil">
      </div>
    </div>
  </header>

  <RouterView />
</template>



<style scoped>
header hr{
  border: 2px, 2px #145d91  
  
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #101A1A;
  height: 13vh;
  padding: 0 2vw;
}

.logo img {
  width: 200px;
  height: 30px;
  object-fit: contain;
}

nav {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
  position: relative;
}

.nav-item {
  position: relative;
  cursor: pointer;
}

nav a {
  font-family: 'Archivo', sans-serif;
  text-decoration: none;
  color: antiquewhite;
  position: relative;
  padding-bottom: 3px;
}

nav a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  background-color: #ECC815;
  transition: width 0.3s ease;
}

nav a:hover::after {
  width: 100%;
}

.submenu {
  display: flex;
  flex-direction: column;  
  position: absolute;
  background-color: #101A1A;
  align-items: center;
  height: 18vh;
  padding-left: 3.5vw;
  padding-right: 3.5vw;
  padding-bottom: 2vh;
  border-bottom-right-radius: 1vw;
  border-bottom-left-radius: 1vw;
  top: 3vw;
  left: 50%;
  justify-content: space-around;
  transform: translateX(-50%);
}



.right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.right span {
  color: whitesmoke;
  font-size: 1.2rem;
  cursor: pointer;
}

.foto-user img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
