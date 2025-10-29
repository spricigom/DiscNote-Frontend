<script setup>
import { computed, reactive } from 'vue'
import Header from '@/components/HeaderComp.vue'
import Footer from '@/components/Footer.vue'
import HeaderComp from '@/components/HeaderComp.vue'
</script>

<template>
  <HeaderComp />
  <main>
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
      <form action=""></form>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cima {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 550px;
}
.troca-foto {
  width: 500px;
  height: 500px;
  background: transparent;
  border: #ecc815 1px solid;
}
.label{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
