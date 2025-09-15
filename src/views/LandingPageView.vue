<script setup>
import { ref } from 'vue'
// Nenhuma lógica ainda, só layout.
// Depois você pode integrar rotas ou props aqui.
</script>


<template>
  <div class="landing">
    <!-- Header -->
    <header>
      <div class="logo">
        Disc<span class="note">♩</span>note
      </div>
      <nav>
        <a href="#">Login</a>
        <a href="#">Como funciona?</a>
        <a href="#" class="btn-outline">Quem Somos?</a>
      </nav>
    </header>

    <!-- Conteúdo central -->
    <main>
      <h1>
        Avalie músicas <br />
        Descubra novos artistas <br />
        Compartilhe playlists com o mundo
      </h1>
      <a href="#" class="btn-primary">Cadastre-se</a>
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
}

/* Header */
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.logo .note {
  color: #1e90ff; /* Destaque da nota musical */
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
    background: #000000 url('@/assets/fundo.jpeg') no-repeat center center/cover; /* Troque '' pela sua imagem futuramente */

}

main h1 {
  font-size: 28px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.btn-primary {
  background: #1e90ff;
  color: white;
  padding: 12px 30px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 16px;
  transition: 0.3s;
}

.btn-primary:hover {
  background: #187bcd;
}
</style>
