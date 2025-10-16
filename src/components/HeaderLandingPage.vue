<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

</script>

<template>
  <header>
    <div class="left">
      <div class="logo">
        <RouterLink to="/LandingPage"> <img src="@/assets/logo.png" alt="Logo DiscNote"></RouterLink>
      </div>
    </div>


    <div class="center">
      <nav>

      <RouterLink to="#">Quem somos?</RouterLink>
      <RouterLink to="#">Como funciona?</RouterLink>

    </nav>

    </div>

    <div class="right">
      <RouterLink v-if="authStore.isLogged" to="/home"><button class="login"><p>Home</p> </button></RouterLink>
      <RouterLink v-else to="/login"><button class="login"><p>Login</p> </button></RouterLink>
    </div>
  </header>
</template>

<style scoped>
.login{
  background-color: rgba(0, 0, 0, 0);
  border: 2px white solid;
  padding: 1.2vh 2vw;
  color: white;
  border-radius: 12px;
  cursor: pointer;
}
.login p{
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: .9rem;
}

.center{
  width: 20vw;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #101A1A;
  height: 15vh;
  padding: 0 2vw;
  margin-top: 2vh;
}
.logo{
  margin-right: -7vw;
}
.logo img {
  width: 250px;
  height: 34px;
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





.right {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.right span {
  color: whitesmoke;
  font-size: 1.2rem;
  cursor: pointer;
}

.foto-user{
    background-color: rgba(0, 0, 0, 0.342);
width: 50px;
height: 50px;
border-radius: 50px;
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




</style>
