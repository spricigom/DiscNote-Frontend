<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const showSubmenu = ref(false)

function toggleSubmenu() {
  showSubmenu.value = !showSubmenu.value
}
const showSidebar = ref(false)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}
</script>

<template>
  <header>
    <div class="logo">
      <RouterLink to="/home"> <img src="@/assets/logo.png" alt="Logo DiscNote"></RouterLink>

    </div>

    <nav>
      <div class="nav-item" @click="toggleSubmenu">
        <RouterLink to="#">Explorar <span><i class="pi pi-angle-down"></i></span></RouterLink>
        <div class="submenu" v-if="showSubmenu">
          <RouterLink to="#">Álbuns</RouterLink>
          <hr>
          <RouterLink to="/musicas">Músicas</RouterLink>
          <hr>
          <RouterLink to="#">Artistas</RouterLink>
        </div>
      </div>
      <RouterLink to="#">Playlists</RouterLink>
      <RouterLink to="#">Resenhas</RouterLink>
      <RouterLink to="/cadastro">Cadastro</RouterLink>

    </nav>

    <div class="right">
      <span class="pi pi-search"></span>
      <span class="pi pi-plus"></span>
      <div v-if="authStore.isLogged" class="foto-user" @click="toggleSidebar">
        <img :src="authStore.user?.avatar" alt="Foto de Perfil">
      </div>
      <RouterLink v-else to="/login"><span class="pi pi-user"></span></RouterLink>

      <div class="sidebar" v-if="showSidebar && authStore.isLogged">

        <div class="top">
          <div class="user">
            <div class="foto-user">
              <img :src="authStore.user?.avatar" alt="Foto de Perfil">
            </div>
            <h3>{{ authStore.user?.name || authStore.user?.username }}</h3>
          </div>

          <button class="close-btn" @click="toggleSidebar"><i class="pi pi-times" style="font-size: .5vw;"></i></button>
        </div>
        <hr style="margin-top: 4vh; width: 100%;">
        <div class="itens-sidebar">
          <p>
            <RouterLink to="/perfil"><i class="pi pi-user" style="color: #145d91; font-size: 1.2vw;"></i> Seu Perfil
            </RouterLink>
          </p>
          <p>
            <RouterLink to="#"><i class="pi pi-clipboard" style="color: #145d91; font-size: 1.2vw;"></i> Suas Resenhas
            </RouterLink>
          </p>
          <p>
            <RouterLink to="#"><i class="pi pi-headphones" style="color: #145d91; font-size: 1.2vw;"></i> Suas Playlisys
            </RouterLink>
          </p>
          <p>
            <RouterLink to="#"><i class="pi pi-star" style="color: #145d91; font-size: 1.2vw;"></i> Favoritos
            </RouterLink>
          </p>
          <p>
            <RouterLink to="#" @click="authStore.logout(); toggleSidebar()"><i class="pi pi-sign-out" style="color: #145d91; font-size: 1.2vw;"></i> Sair
            </RouterLink>
          </p>
        </div>
      </div>
      <div class="overlay" v-if="showSidebar" @click="toggleSidebar"></div>
    </div>
  </header>
</template>

<style scoped>
.submenu hr {
  border: 1px #145d91 solid;
  width: 7vw;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #101A1A;
  height: 15vh;
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

.nav-item>a,
nav>a {
  font-family: 'Archivo', sans-serif;
  text-decoration: none;
  color: white;
  position: relative;
  padding-bottom: 3px;
}

.nav-item>a::after {
  content: '';
  position: absolute;
  left: -5%;
  bottom: -5px;
  width: 0%;
  height: 2px;
  background-color: #ECC815;
  transition: width 0.3s ease;
}

.nav-item>a:hover::after {
  width: 110%;
}

nav>a::after {
  content: '';
  position: absolute;
  left: -5%;
  bottom: -5px;
  width: 0%;
  height: 2px;
  background-color: #ECC815;
  transition: width 0.3s ease;
}

nav>a:hover::after {
  width: 110%;
}

.nav-item {
  position: relative;
  cursor: pointer;
}

.submenu {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #101A1A;
  align-items: center;
  height: 18vh;
  width: 10vw;
  padding-bottom: 2vh;
  border-bottom-right-radius: 1vw;
  border-bottom-left-radius: 1vw;
  top: 3vw;
  left: 50%;
  justify-content: space-around;
  transform: translateX(-50%);
}

.submenu a {
  color: antiquewhite;
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: 'Archivo', sans-serif;
}

.submenu a:hover {
  color: #ECC815;
}

.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
}

.right span {
  color: whitesmoke;
  font-size: 1.2rem;
  cursor: pointer;
}

.foto-user {
  background-color: rgba(0, 0, 0, 0.342);
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.foto-user img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  position: fixed;
  top: 0;
  right: 0;
  width: 15vw;
  height: 100vh;
  background-color: #101A1A;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  padding-top: 4vh;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  z-index: 1000;
}

.itens-sidebar {
  display: flex;
  flex-direction: column;
  gap: 3vh;
  margin-top: 5vh;
}

.itens-sidebar a {
  text-decoration: none;
  color: white;
  font-family: 'Archivo', sans-serif;
  padding-left: 0.5vw;
  transition: color .3s ease;

}

.itens-sidebar a:hover {
  color: #ECC815;
}

.itens-sidebar i {
  margin-right: .5vw;
}

.close-btn {
  background: none;
  border: none;
  color: antiquewhite;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: .5vw;
  padding-right: .5vw;
  width: 100%;
}

.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .7vw;
}

.user h3 {
  font-family: 'Archivo', sans-serif;
  color: white;
  font-weight: 500;
  font-size: 1vw;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
</style>
