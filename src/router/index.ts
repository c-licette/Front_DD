import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/lore',
      name: 'lore',
      component: () => import('../views/LoreView.vue'),
    },
    {
      path: '/vivant',
      name: 'vivant',
      component: () => import('../views/VivantView.vue'),
    },
    {
      path: '/vivant/classes',
      name: 'classes',
      component: () => import('../views/ClassesView.vue'),
    },
    {
      path: '/vivant/races',
      name: 'races',
      component: () => import('../views/RacesView.vue'),
    },
    {
      path: '/vivant/passes',
      name: 'passes',
      component: () => import('../views/PassesView.vue'),
    },
    {
      path: '/vivant/compagnons',
      name: 'compagnons',
      component: () => import('../views/CompagnonsView.vue'),
    },
    {
      path: '/vivant/bestiaire',
      name: 'bestiaire',
      component: () => import('../views/BestiaireView.vue'),
    },
    {
      path: '/regles',
      name: 'regles',
      component: () => import('../views/ReglesView.vue'),
    },
    {
      path: '/joueur',
      name: 'joueur',
      component: () => import('../views/JoueurView.vue'),
    },
    {
      path: '/joueur/creation',
      name: 'creaFiche',
      component: () => import('../views/CreaFicheView.vue'),
    },
    {
      path: '/joueur/bibliotheque',
      name: 'bibliotheque',
      component: () => import('../views/BibliothequeFichesView.vue'),
    },
    {
      path: '/joueur/commu',
      name: 'commu',
      component: () => import('../views/CommunauteFichesView.vue'),
    },
    {
      path: '/objets',
      name: 'objets',
      component: () => import('../views/ObjetsView.vue'),
    },
    {
      path: '/objets/sorts',
      name: 'sorts',
      component: () => import('../views/SortsView.vue'),
    },
    {
      path: '/objets/magique',
      name: 'objMagique',
      component: () => import('../views/ObjMagiqueView.vue'),
    },
    {
      path: '/objets/equipements',
      name: 'equipements',
      component: () => import('../views/EquipementsView.vue'),
    },
  ],
})

export default router
