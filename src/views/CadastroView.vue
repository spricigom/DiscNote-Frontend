<script setup>
import HeaderPag from '@/components/HeaderPag.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')  // Nova variável para "Confirmar Senha"
const showPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}

function login() {
  if (password.value !== confirmPassword.value) {
    alert('As senhas não coincidem. Por favor, tente novamente.');
    return;
  }
  console.log('Login com', email.value, password.value)
}
</script>

<template>
  <div class="container">
    <div class="login-box">
      <h2>Crie sua conta</h2>

      <button class="social-btn google">
        <span>G</span> Continue com Google
      </button>

      <button class="social-btn facebook">
        <span>f</span> Continue com Facebook
      </button>

      <div class="divider">ou</div>

      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="E-mail" required />

        <div class="password-wrapper">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" required />
          <img class="eye" @click="togglePassword" src="@/assets/eye-3-16.png" alt="Mostrar senha" />
        </div>
         <div class="password-wrapper">
          <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirmar Senha" required />
          <img class="eye" @click="togglePassword" src="@/assets/eye-3-16.png" alt="Mostrar senha" />
        </div>

        <button type="submit" class="login-btn">Cadastrar</button>
      </form>

      <div class="footer">
        <p>Já tem uma conta? <router-link to="/login">Entrar</router-link></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
body {
  margin: 0;
  font-family: "Poppins", sans-serif;
}

.container {
  min-height: 100vh;
  background-color: #0e1b21;
  display: flex;
  justify-content: center;
  align-items: center;
    font-family: "Poppins", sans-serif;

}

.login-box {
  background-color: #142930;
  color: white;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
    font-family: "Poppins", sans-serif;

  max-width: 380px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
    font-family: "Poppins", sans-serif;

}

.social-btn {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #2f4f5b;
  border-radius: 8px;
  background: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.social-btn span {
  font-weight: bold;
  font-size: 18px;
}

.google span {
  color: #f8f8f8;
}

.facebook span {
  color: #ffffff;
}

.divider {
  text-align: center;
  margin: 20px 0;
  color: #ccc;
}

form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: none;
  background-color: #1f3a44;
  color: white;
  font-size: 14px;
}

.password-wrapper {
  position: relative;
}

.eye {
  position: absolute;
  right: 1px;
  top: 10px;
  cursor: pointer;
  color: #ccc;
}

.login-btn {
  width: 50%;
  padding: 10px;
  background-color: #0074e8;
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  display: block;
  margin: 0 auto;
}

.login-btn:hover {
  background-color: #005bb5;
}

.footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.footer a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.footer .forgot {
  display: block;
  margin-top: 10px;
}
</style>
