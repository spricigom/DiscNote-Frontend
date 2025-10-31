import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Musicas from '@/views/MusicasView.vue'
import Genero from '@/views/GeneroView.vue'
import Search from '@/views/SearchResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: () => import('../views/CadastroView.vue'),
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: () => import('../views/PerfilView.vue'),
    },
    { path: '/search',
      name: 'search',
      component: () => import('../views/SearchResultsView.vue')},
    {
      path: '/musica/:id',
      name: 'Musica',
      component: () => import('../views/MusicaView.vue'),
      props: true,
    },
    {
      path: '/musica/:musicaId/criarResenha',
      name: 'criarResenha',
      component: () => import('../views/CriarView.vue'),
      props: true
    },
    {
      path: '/teste',
      name: 'teste',
      component: () => import('../views/testesAPIView.vue'),
      props: true
    },
    {
      path: '/perfilUsuario',
      name: 'perfilUsuario',
      component: () => import('../views/perfilUsuarioView.vue'),
      props: true
    },
    {
      path: '/MusicaEstatica',
      name: 'MusicaEstatica',
      component: () => import('../views/MusicaEstaticaView.vue'),
      props: true
    },
    {
      path: '/musicas',
      name: 'musicas',
      component: Musicas
    },
    {
      path: '/genero/:nome',
      name: 'genero',
      component: Genero,
      props: true
    },
    {
      path: '/',
      name: 'LandingPage',
      component: () => import('../views/LandingPageView.vue')
    },
    {
      path: '/VerMais',
      name: 'VerMais',
      component: () => import('../views/VerMaisView.vue')
    },
    {
      path: '/VerMaisResenhas',
      name: 'VerMaisResenhas',
      component: () => import('../views/VerMaisResenhasView.vue')
    },
    {
      path: '/EditarPerfil',
      name: 'EditarPerfil',
      component: () => import('../views/EditarPerfilView.vue')
    },
    {
      path: '/Resenhas',
      name: 'Resenhas',
      component: () => import('../views/ResenhasView.vue')
    },
    {
      path: '/Playlists',
      name: 'Playlists',
      component: () => import('../views/PlaylistsView.vue')
    },
  ],
})

export default router
