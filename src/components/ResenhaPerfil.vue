<script setup>
import { ref, defineProps, onMounted } from 'vue'
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
  <div class="container">
<div class="resenha-wrapper">
    <div class="resenha">
      <div class="foto-resenha">
        <img :src="musica.capa || '#'" :alt="musica.titulo || 'Capa da música'" />
      </div>

      <div class="corpo">
        <div class="titulo">
          <h1>{{ musica.titulo || '' }}</h1>
          <h4>{{ musica.artista || '' }}</h4>
        </div>

        <div class="user-av-e-fav">
          <div class="username">
            <div class="foto-username">
              <img
                :src="`https://www.gravatar.com/avatar/${md5(resenha.usuario.email.trim().toLowerCase())}?s=200&d=identicon`"
                alt=""
              />
            </div>
            <p>@{{ resenha.usuario.username }}</p>
          </div>

          <div class="avaliacao-e-favorito">
            <div class="avaliacao">
              <i
                v-for="i in 5"
                :key="i"
                :class="['pi', i <= (resenha.nota || 0) ? 'pi-star-fill' : 'pi-star']"
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
            <p>{{ resenha.curtidas_count.toLocaleString() || 0 }} curtidas</p>
          </div>
          <div class="comentarios">
            <i class="pi pi-comment"></i>
            <p>{{ resenha.comentarios?.length || 0 }} comentários</p>
          </div>
        </div>
      </div>
    </div>

    <div class="divisao">
      <hr />
    </div>
  </div>
  </div>
  
</template>

<style scoped>

.resenha-wrapper {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.divisao {
  width: 100%;
  margin-bottom: 4vh;
}
.divisao hr {
  width: 100%;
  border: #145d91 1px solid;
}

/* layout interno: resenha ocupa 100% do wrapper */
.resenha {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10vh;
  gap: 2vw;
}

/* foto */
.foto-resenha {
  background-color: rgba(0, 0, 0, 0.308);
  width: 250px;
  height: 250px;
  border-radius: 2vw;
  overflow: hidden;
  display: flex;
}

.foto-resenha img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2vw;
}

/* corpo do texto */
.corpo {
  width: calc(100% - 250px - 2vw);
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

/* avaliação e favorito */
.avaliacao-e-favorito {
  display: flex;
  gap: 1.5vw;
}
.avaliacao {
  display: flex;
  gap: 0.3vw;
  font-size: 1.3vw;
  color: #ecc815;
}
.favorito {
  font-size: 1.3vw;
  color: #145d91;
}

/* texto da resenha */
.texto-resenha {
  width: 100%;
  margin-top: 2vh;
}
.texto-resenha p {
  font-family: 'Archivo', sans-serif;
  color: white;
}

/* curtidas e comentários */
.curtida-e-comentario {
  display: flex;
  gap: 2vw;
  margin-top: 4vh;
}
.curtida,
.comentarios {
  display: flex;
  align-items: center;
  gap: 0.5vw;
}
.curtida i,
.comentarios i {
  color: #145d91;
  font-size: 1.4vw;
}
.curtida p,
.comentarios p {
  font-family: 'DM Mono', sans-serif;
  color: white;
}
</style>
