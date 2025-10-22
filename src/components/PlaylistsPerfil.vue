<script>
import { ref } from 'vue'

</script>
<template>
<div class="card-playlist">
  <div class="m1-playlist">

  </div>
  <div class="m2-playlist">

  </div>
  <div class="m3-playlist">

  </div>
  <div class="nome-playlist"><h3>Nome da Playlist</h3>  </div>
</div>

</template>

<style scoped>
.nome-playlist{
  width: 100%;
  margin-top: 1vh;
  display: flex;
  color: white;
  justify-content: center;
}
.nome-playlist h3{
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}
.m1-playlist{
  width: 200px;
  height: 200px;
  background-color: #000000;
  box-shadow: 30px 1px 15px rgba(0,0,0,0.3);
  grid-column: 1;
  grid-row: 1;
  z-index: 3;
  border-radius: 25px;
}

.m2-playlist{
  width: 190px;
  height: 190px;
  background-color: #666666;
  right: 160px;
  box-shadow: 30px 1px 15px rgba(0,0,0,0.3);
   grid-column: 1;
  grid-row: 1;
  z-index: 2;
  transform: translateX(60px);
    border-radius: 25px;

}

.m3-playlist{
  width: 180px;
  height: 180px;
  background-color: #ffffff;
  right: 320px;
  grid-column: 1;
  grid-row: 1;
  z-index: 1;
  transform: translateX(120px);
    border-radius: 25px;

}

.card-playlist{
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 15vh;
  align-items: center;
  width: 300px;
}
</style>
