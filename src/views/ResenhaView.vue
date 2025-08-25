<script setup>
import Header from '@/components/Header.vue'
</script>

<template>
  <Header/>
  <main>
    <div class="geral">
      <div class="coluna1">
       <img src="@/assets/figure8.jpeg" alt="" class="sliderImage">
        <div class="overlay">
          <h3>Figure 8</h3>
          <p>Elliott Smith</p>
        </div>

        <div class="avaliacao">
          <div class="av1">
            <p><i class="pi pi-clipboard"></i>666k</p>
          </div>
          <div class="av2">
            <p><i class="pi pi-star"></i>4.7/5</p>
          </div>
        </div>
      </div>
      <div class="coluna2">
        <p>lorem</p>
      </div>
      <div class="coluna3">
        <p>Lorem</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.geral {
  display: flex;
  gap:1vh;
  margin-top: 5vh;
}
.coluna1 {
  flex: 1;              /* cada coluna ocupa o mesmo espaço */
  background: #f2f2f2;  /* cor só pra visualizar */
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}
.coluna2 {
  flex: 1;              /* cada coluna ocupa o mesmo espaço */
  background: red;  /* cor só pra visualizar */
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}
.coluna3 {
  flex: 1;              /* cada coluna ocupa o mesmo espaço */
  background: blue;  /* cor só pra visualizar */
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 85%;
  /* mesma altura da imagem */
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.3s ease;
  border-radius: 2vw;
}
.overlay h3 {
  color: white;
  font-size: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.overlay p {
  color: #c4c4c4;
  font-size: 0.9rem;
  font-family: 'Archivo', sans-serif;
}
.avaliacao {
  height: 15%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
}

.avaliacao p {
  color: white;
  font-family: 'DM Mono', sans-serif;
}

.avaliacao i {
  color: #145d91;
  font-size: 1.2rem;
  margin-right: 0.4rem;
  position: relative;
  top: .2vh;
}

.av1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}

.av2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;

}
</style>
