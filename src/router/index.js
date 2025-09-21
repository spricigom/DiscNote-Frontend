import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Musicas from '@/views/MusicasView.vue'
import Genero from '@/views/GeneroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
    {
      path: '/resenhas',
      name: 'Resenha',
      component: () => import('../views/ResenhaView.vue'),
    },
    {
      path: '/musica/:id', 
      name: 'Musica',
      component: () => import('../views/MusicaView.vue'),
      props: true, 
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
      path: '/criarResenha',
      name: 'criarResenha',
      component: () => import('../views/CriarView.vue')
    },
    {
      path: '/LandingPage',
      name: 'LandingPage',
      component: () => import('../views/LandingPageView.vue')
    },
  ],
})

export default router
