<script setup>
import { useAuthStore } from '@/stores/auth';
import HeaderLandingPage from '@/components/HeaderLandingPage.vue'

const authStore = useAuthStore();
</script>

<template>
  <div class="landing">
    <!-- Header -->
<HeaderLandingPage />

    <!-- Conteúdo central -->
    <main>
      <h1>
        Avalie músicas <br />
        Descubra novos artistas <br />
        Compartilhe playlists com o mundo
      </h1>
      <RouterLink v-if="authStore.isLogged" to="/home"><button class="btn-primary"><p>Ir para Home</p></button></RouterLink>
      <RouterLink v-else to="/cadastro"><button class="btn-primary"><p>Cadastre-se</p></button></RouterLink>
    </main>
  </div>
</template>

<style scoped>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.landing {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: Arial, Helvetica, sans-serif;

  /* Fundo aplicado na página inteira */
}
main a{
  z-index: 1;
}

.landing::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0));
  z-index: 0;
  pointer-events: none;
}
/* Header */
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;

  /* Transparente por cima da imagem */
  background: transparent;
  position: absolute; /* fica flutuando em cima */
  top: 0;
  left: 0;
}
.logo {
  font-size: 24px;
  font-weight: bold;
}

.logo .note {
  color: #1e90ff;
}

nav {
  display: flex;
  gap: 30px;
}

nav a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: 0.3s;
}

nav a:hover {
  color: #1e90ff;
}

.btn-outline {
  border: 1px solid white;
  padding: 8px 16px;
  border-radius: 6px;
  background: transparent;
  transition: 0.3s;
}

.btn-outline:hover {
  background: white;
  color: black;
}

/* Conteúdo central */
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4)),
              url('@/assets/fundo2.jpeg') no-repeat center center/cover;
  background-size: 137%;
}

main h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  z-index: 1;
  margin-top: 30vh;
}

.btn-primary {
  background: #145d91;
  color: white;
  padding: 1.5vh 2.5vw;
  border: none;
  border-radius: 12px;
  text-decoration: none;
  transition: 0.3s;
  margin-top: 5vh;
}

.btn-primary:hover {
  background: #187bcd;
  cursor: pointer;
}

.btn-primary p{
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  color: white;

}
</style>
