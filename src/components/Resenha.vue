<script setup>
import { ref, defineProps } from 'vue'
import { onMounted } from 'vue'
import itunesService from '@/services/itunesService'
import md5 from 'crypto-js/md5'

const props = defineProps({
  resenha: {
    type: Object,
    required: true
  },
})
const musica = ref({})

onMounted(async () => {
  musica.value = await itunesService.lookup(props.resenha.musica_id)
})
</script>

<template>
  <div class="divisao">
    <hr />
  </div>

  <RouterLink :to="`/musica/${resenha.musica_id}`">
    <div class="resenha">
      <div class="foto-resenha">
        <img :src="musica.capa" :alt="musica.titulo" />
      </div>

      <div class="corpo">
        <div class="titulo">
          <h1>{{ musica.titulo }}</h1>
          <h4>{{ musica.artista }}</h4>
        </div>

        <div class="user-av-e-fav">
          <div class="username">
            <div class="foto-username">
              <img class="foto-username" :src="`https://www.gravatar.com/avatar/${md5(resenha.usuario.email.trim().toLowerCase())}?s=200&d=identicon`" alt="" />
            </div>
            <p>@{{ resenha.usuario.username }}</p>
          </div>

          <div class="avaliacao-e-favorito">
            <div class="avaliacao">
              <i
                v-for="n in 5"
                :key="n"
                class="pi"
                :class="n <= resenha.nota ? 'pi-star-fill' : 'pi-star'"
              ></i>
            </div>
            <div class="favorito">
              <i :class="['pi', resenha.favorito ? 'pi-heart-fill' : 'pi-heart']"></i>
            </div>
          </div>
        </div>

        <div class="texto-resenha">
          <p>{{ resenha.texto }}</p>
        </div>

        <div class="curtida-e-comentario">
          <div class="curtida">
            <i class="pi pi-thumbs-up"></i>
            <p>{{ resenha.curtidas_count.toLocaleString() }} curtidas</p>
          </div>
          <div class="comentarios">
            <i class="pi pi-comment"></i>
            <!-- <p>{{ resenha.comentarios.toLocaleString() }} comentários</p> -->
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>


<style scoped>
.divisao {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
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
  width: 230px;   /* largura da div */
  height: 230px;  /* altura da div */
  border-radius: 10px;
  overflow: hidden; /* esconde qualquer parte que passe da div */
  background-color: #222; /* só para visualizar o fundo */
}

.foto-resenha img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.resenha {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2vw;
  margin-bottom: 20vh;
}
a{
  text-decoration: none;
}
</style>
