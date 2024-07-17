import { createRouter, createWebHistory } from 'vue-router'
import { sessionStore } from '@/stores/sessionStore';
import { carritoStore } from '@/stores/carritoStore';

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
      },
    },
    {
      path: '/productos',
      children: [
        { 
          path: 'add',
          component: () => import('../views/admin/ProductoEdit.vue'),
          meta: {type:"add"},
          beforeEnter: [requireLogin, isAdmin]
        },
        { path: 'update/:id', 
          component: () => import('../views/admin/ProductoEdit.vue'),
          meta: {type: "update"},
          beforeEnter: [requireLogin, isAdmin]
        },
        {
          path: 'delete/:id',
          component: () => import('../views/admin/ProductoDelete.vue'),
          beforeEnter: [requireLogin, isAdmin]
        }
      ]
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
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue')
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
      },
      beforeEnter: [updateCarrito]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue')
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: () => import('../views/ForbiddenView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  document.title = to.meta.pageTitle || 'Ferremás';
  const session = sessionStore();
  await session.checkCredentials();
  if (to.name === 'login' && session.isLoggedIn) {
    return { name: 'home'}
  }
  const carrito = carritoStore();
  carrito.loadCarrito()
});


async function requireLogin() {
  const session = sessionStore();
  if (!session.isLoggedIn) {
    return {
      name: 'login',
    }
  }
}

async function isAdmin() {
  const session = sessionStore();
  if (session.rol !== "admin") {
    return {
      name: 'forbidden',
    }
  }
}

async function updateCarrito() {
  const carrito = carritoStore();
  carrito.updateCarrito();
}

export default router
