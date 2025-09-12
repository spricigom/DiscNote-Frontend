<template>
  <div class="resenha-wrapper">


    <div class="resenha">
      <div class="foto-resenha">
        <img src="#" alt="" />
      </div>

      <div class="corpo">
        <div class="titulo">
          <h1>Nome da Música</h1>
          <h4>nome do artista</h4>
        </div>

        <div class="user-av-e-fav">
          <div class="username">
            <div class="foto-username">
              <img src="#" alt="" />
            </div>
            <p>@username</p>
          </div>
          <div class="avaliacao-e-favorito">
            <div class="avaliacao">
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

        <div class="texto-resenha">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed voluptate excepturi vero tempore similique...
          </p>
        </div>

        <div class="curtida-e-comentario">
          <div class="curtida">
            <i class="pi pi-thumbs-up"></i>
            <p>2.500 curtidas</p>
          </div>
          <div class="comentarios">
            <i class="pi pi-comment"></i>
            <p>230 comentarios</p>
          </div>
        </div>
      </div>
    </div>
     <div class="divisao">
      <hr />
    </div>
  </div>
</template>

<style scoped>
/* wrapper que garante centralização independente do pai */
.resenha-wrapper {
  width: 80%;        /* largura desejada para a resenha */
  margin: 0 auto;    /* centraliza horizontalmente */
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* separador */
.divisao {
  width: 100%;
  margin-bottom: 2vh;
}
.divisao hr {
  width: 100%;
  border: #145d91 1px solid;
  margin-bottom: 2%;
}

/* layout interno: resenha ocupa 100% do wrapper */
.resenha {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20vh;
  gap: 2vw;
}

/* foto */
.foto-resenha {
  background-color: rgba(0, 0, 0, 0.308);
  width: 250px;
  height: 250px;
  border-radius: 2vw;
  overflow: hidden;         /* força a imagem a respeitar o border-radius */
  display: flex;
}

.foto-resenha img {
  width: 100%;
  height: 100%;
  object-fit: cover;        /* ajusta o enquadramento */
  border-radius: 2vw;       /* garante que siga o mesmo raio da div */
}

/* corpo do texto */
.corpo {
  width: calc(100% - 250px - 2vw); /* ocupa o restante à direita da foto */
  height: 100%;
}

/* título */
.titulo h1 {
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: 600;
}
.titulo h4 {
  font-family: 'Archivo', sans-serif;
  color: white;
  font-weight: 400;
}

/* usuário / avaliação / favoritar */
.user-av-e-fav {
  display: flex;
  flex-direction: row;
  margin-top: 4vh;
  align-items: center;
  gap: 3vw;
}
.username {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.foto-username {
  background-color: rgba(0, 0, 0, 0.315);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: .5vw;
}
.foto-username img { object-fit: cover; }
.username p {
  font-family: 'Archivo', sans-serif;
  color: #c4c4c4;
  font-weight: 500;
}

/* avaliação e favorito */
.avaliacao-e-favorito { display:flex; gap:1.5vw; }
.avaliacao { display:flex; gap:0.3vw; font-size:1.3vw; color:#ecc815; }
.favorito { font-size:1.3vw; color:#145d91; }

/* texto da resenha */
.texto-resenha { width: 100%; margin-top: 2vh; }
.texto-resenha p {
  font-family: 'Archivo', sans-serif;
  color: white;
}

/* curtidas e comentários */
.curtida-e-comentario { display:flex; gap:2vw; margin-top:4vh; }
.curtida, .comentarios { display:flex; align-items:center; gap:.5vw; }
.curtida i, .comentarios i { color:#145d91; font-size:1.4vw; }
.curtida p, .comentarios p { font-family:'DM Mono', sans-serif; color:white; }
</style>
