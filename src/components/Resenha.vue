<script>
import { ref } from 'vue'
</script>
<template>
  <div class="divisao">
    <hr />
  </div>
  <RouterLink to="/resenhas"><div class="resenha">
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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed voluptate excepturi vero
          tempore similique ea, quo obcaecati libero quibusdam illo quidem consectetur dolor ab,
          possimus neque officiis sint laboriosam numquam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Molestiae recusandae autem hic ad assumenda quis illo doloremque unde
          impedit, obcaecati modi quae quos sint harum iste dolor nesciunt, labore dolore. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Itaque, deleniti omnis eos in maiores
          earum quibusdam consectetur, repellendus harum iusto voluptatibus sequi, error
          consequuntur minus dicta vitae voluptates dolor amet.
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
  </div></RouterLink>

</template>

<style scoped>
.divisao {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 67%;
}

.divisao hr {
  width: 100%;
  border: #145d91 1px solid;
  margin-bottom: 2%;
}

.curtida-e-comentario {
  display: flex;
  flex-direction: row;
  gap: 2vw;
  margin-top: 4vh;
}

.comentarios {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5vw;
}

.comentarios i {
  color: #145d91;
  font-size: 1.4vw;
}

.comentarios p {
  font-family: 'DM Mono', sans-serif;
  color: white;
}

.curtida {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5vw;
}

.curtida i {
  color: #145d91;
  font-size: 1.4vw;
}

.curtida p {
  font-family: 'DM Mono', sans-serif;
  color: white;
}

.avaliacao {
  display: flex;
  flex-direction: row;
  gap: 0.3vw;
  font-size: 1.3vw;
  color: #ecc815;
}

.favorito {
  display: flex;
  flex-direction: row;
  font-size: 1.3vw;
  color: #145d91;
}

.user-av-e-fav {
  display: flex;
  flex-direction: row;
  margin-top: 4vh;
  align-items: center;
  gap: 3vw;
}

.avaliacao-e-favorito {
  display: flex;
  flex-direction: row;
  gap: 1.5vw;
}

.texto-resenha {
  width: 100%;
  margin-top: 2vh;
}

.texto-resenha p {
  font-family: 'Archivo', sans-serif;
  color: white;
}

.corpo {
  height: 100%;
  width: 70%;
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

.username p {
  font-family: 'Archivo', sans-serif;
  color: #c4c4c4;
  font-weight: 500;
}

.username {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.titulo h4 {
  font-family: 'Archivo', sans-serif;
  color: white;
  font-weight: 400;
}

.titulo h1 {
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: 600;
}

.foto-resenha {
  background-color: rgba(0, 0, 0, 0.308);
  width: 250px;
  height: 250px;
  border-radius: 2vw;
  display: flex;
}

.resenha {
  width: 67%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20vh;
  gap: 2vw;
}
</style>
