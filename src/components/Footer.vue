<script setup>
import { ref } from 'vue'
</script>

<template>
  <footer>
    <div class="footer-content">
      <RouterLink to="/" class="logo">
        <img src="@/assets/logo.png" alt="Logo DiscNote" />
      </RouterLink>

      <div class="social-links">
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <i class="pi pi-instagram"></i>
        </a>
        <a href="https://twitter.com" target="_blank" aria-label="Twitter">
          <i class="pi pi-youtube"></i>
        </a>
        <a href="https://github.com" target="_blank" aria-label="GitHub">
          <i class="pi pi-github"></i>
        </a>
      </div>

      <ul class="footer-menu">
        <li><RouterLink to="/sobre">Sobre</RouterLink></li>
        <li><RouterLink to="/contato">Contato</RouterLink></li>
        <li><RouterLink to="/politica">Política de Privacidade</RouterLink></li>
      </ul>

      <p>© 2025, DiscNote. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #21282b;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.footer-content {
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.logo img {
  width: 130px;
}

.social-links {
  display: flex;
  gap: 1.2rem;
  margin: 0.5rem 0;
}
.social-links a {
  color: #e0e0e0;
  font-size: 1.4rem;
  transition: color 0.3s ease;
}
.social-links a:hover {
  color: #ffffff;
}

.footer-menu {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}
.footer-menu li a {
  color: #c4c4c4;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}
.footer-menu li a:hover {
  color: white;
}

.footer-content p {
  font-family: 'Archivo', sans-serif;
  color: #e0e0e0;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}
</style>
