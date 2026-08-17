<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMusicasStore } from '@/stores/musicas'
import { useResenhaStore } from '@/stores/resenhas'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Footer from '@/components/Footer.vue'
import HeaderComp from '@/components/HeaderComp.vue'
import Toast from '@/components/Toast.vue'

const router = useRouter()
const musicasStore = useMusicasStore()
const resenhasStore = useResenhaStore()
const resenha = ref('')
const rating = ref(0)
const hoverRating = ref(0)
const favorito = ref(false)
const musica = computed(() => musicasStore.musicaAtual || {})
const authStore = useAuthStore()
const capaAlta = computed(() => {
  if (!musica.value.capa) return ''
  return musica.value.capa.replace(/([0-9]+x[0-9]+)bb/, '600x600bb')
})
const props = defineProps({
  musicaId: {
    type: String,
    required: true,
  },
})

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success') // 'success' ou 'error'

const maxCaracteres = 1000
const caracteresRestantes = computed(() => maxCaracteres - resenha.value.length)
const podeSalvar = computed(() => rating.value > 0 && resenha.value.trim().length > 0)

function setRating(n) {
  rating.value = n
}

function setHoverRating(n) {
  hoverRating.value = n
}

function toggleFavorito() {
  favorito.value = !favorito.value
}

async function salvarResenha() {
  if (!podeSalvar.value) {
    toastMessage.value = 'Dê uma nota e escreva sua resenha antes de salvar.'
    toastType.value = 'error'
    showToast.value = true
    return
  }

  try {
    await resenhasStore.addResenha({
      musica_id: props.musicaId,
      texto: resenha.value,
      nota: rating.value,
      favorito: favorito.value,
      data: new Date().toLocaleDateString(),
      usuario: authStore.user.id,
    })
    toastMessage.value = `Resenha salva! Nota: ${rating.value} | Favorito: ${favorito.value ? 'Sim' : 'Não'}`
    toastType.value = 'success'
    showToast.value = true
    setTimeout(() => {
      router.push({ path: `/musica/${props.musicaId}` })
    }, 2000)
  } catch (error) {
    toastMessage.value = 'Erro ao salvar resenha: ' + error.message
    toastType.value = 'error'
    showToast.value = true
  }
}

onMounted(() => {
  musicasStore.fetchMusica(props.musicaId)
})

if (!authStore.isLogged) {
  alert('Você precisa estar logado para resenhar uma música.')
  router.push({ path: '/login' })
}
</script>

<template>
  <HeaderComp />
  <main>
    <div class="cabecalho">
      <p class="titulo">Escrever resenha</p>
      <p class="subtitulo">Compartilhe o que você achou dessa música</p>
    </div>

    <div class="geral">
      <div class="card-info">
        <div class="imagem">
          <img v-if="capaAlta" :src="capaAlta" alt="Capa da música" />
        </div>

        <h2 class="musica">{{ musica.titulo }}</h2>
        <p class="artista">{{ musica.artista }}</p>

        <div class="avaliacao" @mouseleave="setHoverRating(0)">
          <span
            v-for="n in 5"
            :key="n"
            class="estrela"
            :class="{ ativo: n <= (hoverRating || rating) }"
            @mouseenter="setHoverRating(n)"
            @click="setRating(n)"
          >
            ★
          </span>
        </div>
        <p class="legenda">
          {{ rating > 0 ? `Sua nota: ${rating}/5` : 'Avaliar' }}
        </p>

        <button
          class="favorito"
          :class="{ ativo: favorito }"
          type="button"
          @click="toggleFavorito"
        >
          <i :class="['pi', favorito ? 'pi-heart-fill' : 'pi-heart']"></i>
          <span>{{ favorito ? 'Favoritado' : 'Favoritar' }}</span>
        </button>
      </div>

      <div class="card-texto">
        <label class="label-textarea" for="texto-resenha">Sua resenha</label>
        <textarea
          id="texto-resenha"
          v-model="resenha"
          :maxlength="maxCaracteres"
          placeholder="O que você achou dessa música? Fale sobre a letra, a produção, o que ela te fez sentir..."
          class="textarea"
        ></textarea>
        <div class="rodape-texto">
          <span class="contador">{{ caracteresRestantes }} caracteres restantes</span>
          <button class="salvar" :disabled="!podeSalvar" @click="salvarResenha">
            Salvar Resenha
          </button>
        </div>
      </div>
    </div>
  </main>

  <Toast
    v-if="showToast"
    :message="toastMessage"
    :type="toastType"
    @close="showToast = false"
  />

  <Footer />
</template>

<style scoped>
main {
  min-height: 100vh;
  background-color: #162326;
  align-items: center;
}

.cabecalho {
  width: 100%;
  max-width: 1000px;
  align-self: center;
  margin: 6vh auto 0;
  padding: 0 2vw;
  font-family: 'Montserrat', sans-serif;
}

.titulo {
  color: white;
  font-size: 2.4rem;
  font-weight: 600;
}

.subtitulo {
  color: #a3a3a3;
  font-size: 1.1rem;
  margin-top: 6px;
}

.geral {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
  width: 100%;
  max-width: 1000px;
  margin: 4vh auto 8vh;
  padding: 0 2vw;
  align-items: start;
}

.card-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #1c2b2f;
  border-radius: 14px;
  padding: 28px 20px;
  color: white;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.imagem {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #0d1717;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 18px;
}

.imagem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.musica {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.3;
}

.artista {
  margin: 4px 0 20px;
  font-size: 0.95rem;
  color: #a3a3a3;
}

.avaliacao {
  display: flex;
  justify-content: center;
  gap: 6px;
  font-size: 32px;
  cursor: pointer;
}

.estrela {
  color: #3a4a4d;
  transition: color 0.15s ease, transform 0.15s ease;
}

.estrela.ativo {
  color: #ecc815;
  transform: scale(1.08);
}

.legenda {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #a3a3a3;
}

.favorito {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 22px;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid #3a4a4d;
  border-radius: 8px;
  color: #d9d9d9;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  transition: 0.2s ease;
}

.favorito i {
  font-size: 1.1rem;
}

.favorito:hover {
  border-color: #145d91;
}

.favorito.ativo {
  border-color: #e0455b;
  color: #e0455b;
  background: rgba(224, 69, 91, 0.08);
}

.card-texto {
  display: flex;
  flex-direction: column;
  background: #1c2b2f;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.label-textarea {
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 12px;
}

.textarea {
  height: 260px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  border: 1px solid #2f4247;
  border-radius: 8px;
  padding: 14px;
  font-size: 1rem;
  font-family: 'Archivo', sans-serif;
  line-height: 1.5;
  background: #101a1a;
  color: white;
  outline: none;
  transition: border-color 0.2s ease;
}

.textarea::placeholder {
  color: #6b7a7d;
}

.textarea:focus {
  border-color: #145d91;
}

.rodape-texto {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  gap: 16px;
}

.contador {
  color: #6b7a7d;
  font-size: 0.85rem;
  font-family: 'DM Mono', sans-serif;
}

.salvar {
  background: #145d91;
  color: white;
  border: none;
  padding: 12px 26px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  transition: background 0.2s ease;
}

.salvar:hover:not(:disabled) {
  background: #0f4a73;
}

.salvar:disabled {
  background: #3a4a4d;
  color: #8a9a9d;
  cursor: not-allowed;
}

@media (max-width: 800px) {
  .geral {
    grid-template-columns: 1fr;
  }

  .card-info {
    max-width: 340px;
    margin: 0 auto;
  }

  .titulo {
    font-size: 1.8rem;
  }
}
</style>
