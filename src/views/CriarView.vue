<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMusicasStore } from '@/stores/musicas'
import { useResenhaStore } from '@/stores/resenhas'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const musicasStore = useMusicasStore()
const resenhasStore = useResenhaStore()
const resenha = ref('')
const rating = ref(0)
const favorito = ref(false)
const musica = computed(() => musicasStore.musicaAtual || {})
const authStore = useAuthStore()

const props = defineProps({
  musicaId: {
    type: String,
    required: true
  }
})

function setRating(n) {
  rating.value = n
}

function toggleFavorito() {
  favorito.value = !favorito.value
}

async function salvarResenha() {
  try {
    await resenhasStore.addResenha({
      musica_id: props.musicaId,
      texto: resenha.value,
      nota: rating.value,
      favorito: favorito.value,
      data: new Date().toLocaleDateString(),
      usuario: authStore.user.id
    })
    alert(`Resenha salva! Nota: ${rating.value} | Favorito: ${favorito.value}`)
  } catch (error) {
    alert(error)
  }
  router.push({ path: `/musica/${props.musicaId}` });
}

onMounted(() => {
  musicasStore.fetchMusica(props.musicaId)
})

if (!authStore.isLogged) {
  alert('Você precisa estar logado para resenhar uma música.');
  router.push({ path: '/login'});
} 
</script>

<template>
  <header>
    <p class="titulo">Resenhar...</p>
  </header>
  <div class="geral">
    <div class="left">
      <div class="informacoes">
        <div class="imagem">
          <img :src="musica.capa" alt="Capa da música" class="imagem" />
        </div>
        <div class="avaliacao">
          <span v-for="n in 5" :key="n" class="estrela" :class="{ ativo: n <= rating }" @click="setRating(n)">
            ★
          </span>
        </div>
        <p>Avaliar</p>
        <div class="favorito" @click="toggleFavorito">
          <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=favorite" />
          <span class="material-symbols-outlined" :class="{ ativo: favorito }">favorite</span>
          <p>Favoritar</p>
        </div>
        <button class="salvar" @click="salvarResenha">Salvar Resenha</button>
      </div>
    </div>

    <div class="center">
      <div class="card">
        <h2 class="musica">{{ musica.titulo }}</h2>
        <p class="artista">{{ musica.artista }}</p>

        <textarea v-model="resenha" placeholder="Escreva sua resenha..." class="textarea"></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  background-color: #162326;
}

.geral {
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 32px;
  height: 100%;
  font-family: 'Montserrat', sans-serif;
}

header {
  border-bottom: 2px solid #145d91;
}

.titulo {
  margin-left: 50px;
  margin-top: 25px;
  margin-bottom: 15px;
  color: white;
  font-size: 4vh;
  font-family: 'Montserrat', sans-serif;
}

.left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5vh;
}

.informacoes {
  border-radius: 10px;
  text-align: center;
  color: white;
}

.imagem {
  width: 220px;
  height: 220px;
  background: #0d1717;
  border-radius: 8px;
  margin-bottom: 10px;
}

.avaliacao {
  display: flex;
  justify-content: center;
  gap: 5.3px;
  font-size: 30px;
  cursor: pointer;
}

p {
  margin-top: 7px;
  font-size: 20px;
  font-weight: 500;
}

.estrela {
  color: #888;
  transition: 0.2s;
}

.estrela.ativo {
  color: gold;
}

.favorito {
  margin: 15px 0;
  cursor: pointer;
}

.favorito span {
  font-size: 40px;
  color: #3b82f6;
}

.favorito span.ativo {
  color: red;
}

.salvar {
  background: #16a34a;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.2s;
  font-size: 20px;
}

.salvar:hover {
  background: #15803d;
}


.center {
  padding-top: 6px;
}

.card {
  border-radius: 10px;
  width: 800px;
  height: 600px;
  color: white;
}

.musica {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
}

.artista {
  margin: 0 0 15px 0;
  font-size: 1rem;
  opacity: 0.8;
}

.textarea {
  width: 800px;
  height: 500px;
  resize: none;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
  background: #d9d9d9;
  outline: none;
}
</style>
