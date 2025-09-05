<script setup>
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <main>
    <div class="geral">
      <div class="coluna1">
        <img src="@/assets/figure8.jpeg" alt="" class="sliderImage" />
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
        <p class="titulo">Volevo Essere un Duro</p>
        <p class="subtitulo">Lucio Corsi (2025)</p>
        <div class="descricao">
          <p>Compositor(es): Lucio Corsi, Tomasso Ottomano</p>
          <p>Gênero: Glam Rock, Rock</p>
          <p>Produtores(es): Lucio Corsi, Tomasso Ottomano, Antonia Cupertino</p>
          <p>Data de lançamento: 12 de fevereiro de 2025</p>
        </div>
        <div class="letra">
          <p>
            Volevo essere un duro <br />
            Che non gli importa del futuro <br />
            Un robot, un lottatore di sumo <br />
            Uno spaccino in fuga da un cane lupo <br />
            Alla stazione di Bolo' <br />
            Una gallina dalle uova d'oro <br />
            Però non sono nessuno <br />
            Non sono nato con la faccia da duro <br />
            Ho anche paura del buio
          </p>
          <a href="#" class="link">Ver letra completa...</a>
        </div>
        <div class="divisao">
          <h3>Resenhas</h3>
          <hr />
        </div>
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
            </div>
          </div>

          <!-- Texto -->
          <p class="texto-resenha">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra diam quis leo
            finibus, vel posuere augue volutpat. Aenean orci lacus, luctus sed faucibus vel,
            ultricies ut leo. Quisque cursus libero eros, eget fringilla mi convallis a. Nulla
            porttitor lorem ac diam mollis scelerisque. Praesent ut luctus tellus, id facilisis
            felis. ac.
          </p>

          <div class="curtida">
            <i class="pi pi-thumbs-up"></i>
            <p>2.500 curtidas</p>
          </div>
        </div>
      </div>
      <div class="coluna3">
        <p>Lorem</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap');

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
  text-align: center;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  align-items: center;
}
.coluna3 {
  flex: 1;
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
  top: 0.2vh;
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
.titulo {
  color: white;
  font-size: 5vh;
}
.subtitulo {
  color: white;
  margin-bottom: 25px;
  font-size: 2.3vh;
}

.descricao p {
  opacity: 70%;
  color: #d9d9d9;
  text-align: left;
}

.letra {
  background-color: #133c50;
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 75%;
  margin: 40px auto;
  text-align: center;
}

.link {
  display: block;
  margin-top: 10px;
  font-size: 0.9em;
  color: #a0d8ff;
  text-decoration: none;
  text-align: right;
}

.link:hover {
  text-decoration: underline;
}

.divisao {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 67%;
}

.divisao h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4vw;
  font-weight: 500;
  color: white;
}

.divisao hr {
  width: 100%;
  border: #145d91 1px solid;
  margin-bottom: 2%;
}
.resenha {
  color: #fff;
  padding: 16px;
  border-radius: 12px;
  width: 80%;
  margin: auto;
  font-family: Arial, sans-serif;
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
  font-weight: bold;
  margin: 0;
}

.avaliacao-resenha {
  display: flex;
  flex-direction: row;
  gap: 0.3vw;
  font-size: 1.5vw;
  color: #ecc815;
  margin-left: 5vw;
}
.favorito {
  display: flex;
  flex-direction: row;
  font-size: 1.5vw;
  color: #145d91;
  margin-left: 6vw;
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
  gap: 2vw;
}

.texto-resenha {
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.9;
  margin: 12px 0;
  text-align: left;
}

.curtida {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5vw;
}

.curtida i {
  color: #145d91;
  font-size: 1.2vw;
}

.curtida p {
  font-family: 'DM Mono', sans-serif;
  color: white;
  font-size:0.9vw;
}
</style>
