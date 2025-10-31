<script setup>
import { ref } from 'vue'
import HeaderComp from '@/components/HeaderComp.vue'
import Footer from '@/components/Footer.vue'
import { useAuthStore } from '@/stores/auth'
import { useMusicasStore } from '@/stores/musicas'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const musicasStore = useMusicasStore()
const router = useRouter()

// Estados locais com os dados atuais do usuário
const username = ref(authStore.user?.username || '')
const apelido = ref(authStore.user?.name || '')
const avatarPreview = ref(authStore.user?.avatar || '')

// Manipulação de imagem (preview)
function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      avatarPreview.value = reader.result // só preview
    }
    reader.readAsDataURL(file)
  }
}

// Salvar alterações no store e atualizar resenhas locais
function salvarAlteracoes() {
  try {
    authStore.user.username = username.value
    authStore.user.name = apelido.value
    authStore.user.avatar = avatarPreview.value

    // Atualiza todas as resenhas locais do usuário
    musicasStore.resenhasMusica.forEach(res => {
      if (res.usuario.id === authStore.user.id) {
        res.usuario.username = username.value
        res.usuario.name = apelido.value
        res.usuario.avatar = avatarPreview.value
      }
    })

    alert('✅ Alterações salvas!')
    router.push('/perfilUsuario') // volta pro perfil
  } catch (error) {
    console.error('❌ Erro ao salvar perfil:', error)
    alert('Erro ao salvar alterações.')
  }
}
</script>

<template>
  <HeaderComp />
  <main>
    <div class="cabecalho">
      <h1>Editar Perfil</h1>
      <hr />
    </div>

    <div class="cima">
      <div class="label">
        <h2>Editar foto</h2>
        <span class="pi pi-pencil"></span>
      </div>

      <div class="troca-foto">
        <img :src="avatarPreview" alt="Foto do perfil" />
        <input type="file" accept="image/*" @change="handleFileChange" />
      </div>
    </div>

    <div class="baixo">
      <div class="form">
        <div class="campo">
          <div class="label">
            <h2>Username</h2>
            <span class="pi pi-pencil"></span>
          </div>
          <input type="text" v-model="username" placeholder="@username" />
        </div>

        <div class="campo">
          <div class="label">
            <h2>Apelido</h2>
            <span class="pi pi-pencil"></span>
          </div>
          <input type="text" v-model="apelido" placeholder="Apelido" />
        </div>
      </div>
      <div class="salvar">
        <RouterLink to="/perfilUsuario">
          <button class="btn-salvar" @click="salvarAlteracoes">Salvar Alterações</button>
        </RouterLink>
      </div>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
/* ===== CSS ORIGINAL ===== */
main {
  min-height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cabecalho {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 6vh;
}
.cabecalho h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-left: 10vw;
  margin-top: 7vh;
  color: white;
}
.cabecalho hr {
  border: #145d91 solid 1px;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 1vh;
}
.cima {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 550px;
  margin-bottom: 7vh;
}
.troca-foto {
  width: 500px;
  height: 500px;
  background: transparent;
  border: #ecc815 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.troca-foto img {
  background-color: rgba(0, 0, 0, 0.384);
  width: 420px;
  height: 420px;
  border-radius: 50%;
  object-fit: cover;
}
.troca-foto input[type='file'] {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #ecc815;
}
.label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4vh;
}
.label h2 {
  font-family: 'Montserrat', sans-serif;
  color: #bdbdbd;
  font-weight: 500;
  font-size: 1.2vw;
}
.label span {
  color: #bdbdbd;
}
.form {
  display: flex;
  flex-direction: row;
  width: 65vw;
  justify-content: space-around;
  margin-bottom: 6vh;
}
.campo {
  display: flex;
  flex-direction: column;
}
.campo input {
  border: 1px solid #ecc815;
  background: none;
  color: #145d91;
  padding-left: 1vw;
  outline: none;
  caret-color: #ecc815;
  width: 20vw;
  height: 6vh;
  font-size: 1.3vw;
}
.campo input::placeholder {
  color: #145d91a8;
  font-size: 1.3vw;
}
.btn-salvar {
  padding: 10px 25px;
  border: 1px solid #ffffff;
  background: transparent;
  color: #ffffff;
  font-size: 1.2vw;
  border-radius: 5px;
  cursor: pointer;
}
.salvar{
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 10vh;
}
</style>
