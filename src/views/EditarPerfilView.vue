<script setup>
import { computed, reactive } from 'vue'
import Header from '@/components/HeaderComp.vue'
import Footer from '@/components/Footer.vue'
import HeaderComp from '@/components/HeaderComp.vue'
</script>

<template>
  <HeaderComp />
  <main>
    <div class="cabecalho">
      <h1>Editar Perfil</h1>
      <hr>
    </div>
    <div class="cima">
      <div class="label">
        <h2>Editar foto</h2>
        <span class="pi pi-pencil"></span>
      </div>

      <div class="troca-foto">
        <img src="" alt="" />
      </div>
    </div>
    <div class="baixo">
      <div class="form">
        <div class="campo">
           <div class="label">
        <h2>Username</h2>
        <span class="pi pi-pencil"></span>
      </div>
          <input type="text" placeholder="@username">
          
        </div>
        <div class="campo">
           <div class="label">
        <h2>Apelido</h2>
        <span class="pi pi-pencil"></span>
      </div>
          <input type="text" placeholder="Apelido">

        </div>
      </div>
        
    </div>
  </main>
  <Footer/>
</template>

<style scoped>
main {
  min-height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cabecalho{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 6vh;
}
.cabecalho h1{
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-left: 10vw;
  margin-top: 7vh;
  color: white;
}
.cabecalho hr{
  border: #145d91 solid 1px;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 1vh;
}
.cima {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 550px;
  margin-bottom: 7vh;
}
.troca-foto {
  width: 500px;
  height: 500px;
  background: transparent;
  border: #ecc815 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.troca-foto img{
  background-color: rgba(0, 0, 0, 0.384);
  width: 420px;
  height: 420px;
  border-radius: 50%;
}
.label{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .4vh;
}
.label h2{
  font-family: 'Montserrat', sans-serif;
  color: #bdbdbd;
  font-weight: 500;
  font-size: 1.2vw;
}
.label span{
  color: #bdbdbd;
}
.form{
  display: flex;
  flex-direction: row;
  width: 65vw;
  justify-content: space-around;
  margin-bottom: 20vh;
}
.campo{
  display: flex;
  flex-direction: column;
}
.campo input{
  border: 1px solid #ecc815;
  background: none;
  color: #145d91;
  padding-left: 1vw;
  outline: none;
  caret-color: #ecc815;
  width: 20vw;
  height: 6vh;
  font-size: 1.3vw;
}

.campo input::placeholder{
color: #145d91a8;
font-size: 1.3vw;
}
</style>
