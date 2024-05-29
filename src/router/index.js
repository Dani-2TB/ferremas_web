import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        pageTitle: "Ferretería Ferremás",
        pageSubtitle: "Arreglarlo nunca fue tan fácil"
      }
    },
    {
      path: '/nosotros',
      name: 'nosotros',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        pageTitle: "Sobre Nosotros"
      }
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('../views/ContactView.vue'),
      meta: {
        pageTitle: 'Contáctanos'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: {
        pageTitle: 'Ferremás Usuarios'
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/auth/LogoutView.vue'),
      meta: {
        pageTitle: "Ferremás Usuarios"
      }
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/CarritoView.vue'),
      meta: {
        pageTitle: "Carrito de compras",
        pageSubtitle: "¡Gracias por preferirnos!"
      }
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta.pageTitle || 'Ferremás'
});

export default router
