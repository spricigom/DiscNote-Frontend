<script setup>
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <main>
    <div class="geral">
      <div class="coluna1">
        <img src="@/assets/figure8.jpeg" alt="" class="imgMusica" />
        <button id="escrever">Escrever Resenha</button>
      </div>
      <div class="coluna2">
        <div class="nomes">
          <h1 class="titulo">Nome da Música</h1>
          <h2 class="artista">Nome do artista</h2>
        </div>
        <div class="divisao">
          <h3 id="generos">Gêneros</h3>
         </div> 
         <hr />
        
        <div class="divisao">
          <h3 id="resenhas">Resenhas</h3>
        </div> 
         <hr />
        
        <div class="resenha">
          <div class="user-av-e-fav">
            <div class="foto-username">
              <img src="#" alt="" />
            </div>
            <p class="username">@username</p>
            <div class="avaliacao-e-favorito">
              <div class="avaliacao-resenha">
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
              </div>
              <div class="favorito">
                <i class="pi pi-heart-fill"></i>
              </div>
              <div class="data">28/08/2025</div>
            </div>
          </div>

          <!-- Texto -->
          <p class="texto-resenha">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra diam quis leo
            finibus, vel posuere augue volutpat. Aenean orci lacus, luctus sed faucibus vel,
            ultricies ut leo. Quisque cursus libero eros, eget fringilla mi convallis a. Nulla
            porttitor lorem ac diam mollis scelerisque. Praesent ut luctus tellus, id facilisis
            felis. ac. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nihil
            eveniet accusantium molestiae minus nisi laborum ut officia? Aliquid facere libero sed
            provident. Maiores eligendi nihil sunt, mollitia inventore explicabo.
          </p>

          <div class="curtida">
            <i class="pi pi-thumbs-up"></i>
            <p>2.500 curtidas</p>
          </div>
        </div>
        <hr>
        <div class="resenha">
          <div class="user-av-e-fav">
            <div class="foto-username">
              <img src="#" alt="" />
            </div>
            <p class="username">@username</p>
            <div class="avaliacao-e-favorito">
              <div class="avaliacao-resenha">
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
              </div>
              <div class="favorito">
                <i class="pi pi-heart-fill"></i>
              </div>
              <div class="data">28/08/2025</div>
            </div>
          </div>

          <!-- Texto -->
          <p class="texto-resenha">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra diam quis leo
            finibus, vel posuere augue volutpat. Aenean orci lacus, luctus sed faucibus vel,
            ultricies ut leo. Quisque cursus libero eros, eget fringilla mi convallis a. Nulla
            porttitor lorem ac diam mollis scelerisque. 
          </p>

          <div class="curtida">
            <i class="pi pi-thumbs-up"></i>
            <p>2.500 curtidas</p>
          </div>
        </div>
        <hr>
      </div>
      <div class="coluna3">
        <p>Lorem</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
.geral {
  display: flex;
  gap: 1vh;
  margin-top: 5vh;
  font-family: 'Archivo', sans-serif;
}
.coluna1 {
  flex: 1;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}
.coluna2 {
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}
.coluna3 {
  flex: 1;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

/* Coluna 1*/
.imgMusica{
  border-radius: 10px;
}
#escrever{
  
}

/* Coluna 2*/
.nomes {
  text-align: left;
}
.titulo {
  color: white;
  font-size: 5.5vh;
}

.artista {
  color: #d8d8d8;
  font-size: 2.25vh;
}

.divisao {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 67%;
  margin-top: 6vh;
}

hr {
  width: 100%;
  border: #145d91 1px solid;
  margin-bottom: 2%;
}
#generos {
  font-family: 'Poppins', sans-serif;
  font-size: 1vw;
  font-weight: 500;
  color: #145d91;
}
#resenhas {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4vw;
  font-weight: 500;
  color: #145d91;
}

.resenha {
  color: #fff;
  padding: 16px;
  border-radius: 12px;
  width: 80%;
  margin: auto;
  font-family: Arial, sans-serif;
  text-align: left;
}

.foto-username {
  background-color: rgba(0, 0, 0, 0.315);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5vw;
}

.foto-username img {
  object-fit: cover;
}

.username {
  font-size: 2vh;
  margin: 0;
}

.avaliacao-resenha {
  display: flex;
  flex-direction: row;
  gap: 0.3vw;
  font-size: 1vw;
  color: #ecc815;
  margin-left: 1vw;
}
.favorito {
  display: flex;
  flex-direction: row;
  font-size: 1.2vw;
  color: #145d91;
}
.data{
  font-size: 1vw;
  color: #9E9E9E;
}

.user-av-e-fav {
  display: flex;
  flex-direction: row;
  margin-top: 4vh;
  align-items: center;
}
.avaliacao-e-favorito {
  display: flex;
  flex-direction: row;
  gap: 1.2vw;
}

.texto-resenha {
  font-size: 2vh;
  line-height: 1.4;
  text-align: left;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
}

.curtida {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5vw;
  margin-bottom: 2vh;
}

.curtida i {
  color: #145d91;
  font-size: 1vw;
}

.curtida p {
  font-family: 'DM Mono', sans-serif;
  color: white;
  font-size: 0.7vw;
}
/* Coluna 3*/
</style>
