<template>
  <nav class="navbar navbar-expand-lg bg-ferremas sticky-top shadow-sm">
    <div class="container"> 
      <RouterLink to="/" class="navbar-brand">
        <img src="../assets/images/logo.png" alt="logo" class="nav-logo">
        Ferremás
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Abrir Navegación">
        <span class="navbar-toggler-icon"></span>
      </button>
        
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul v-if="session.isLoggedIn" class="navbar-nav ms-3">
          <li class="nav-item">
            <span class="user-greeting">
              Hola {{ session.username }}! 
            </span>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link position-relative" to="/carrito">
              <img class="carrito-img" src="../assets/images/cart.svg">
              <span class="position-absolute top-20 start-80 translate-middle badge bg-dark rounded-circle text-white" v-if="cantidadItems > 0">
                {{ cantidadItems }}
              </span>
            </RouterLink>
          </li>
          <li 
            v-if="session.isLoggedIn && session.rol === 'admin'" 
            class="nav-item"
          >
            <RouterLink class="nav-link" to="/admin">Administrar</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/nosotros">Nosotros</RouterLink>
          </li>
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="contacto">Contacto</RouterLink>
          </li> -->
          <li v-if="!session.isLoggedIn" class="nav-item">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
          <li v-else class="nav-item">
            <RouterLink class="nav-link" to="/logout">Logout</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { sessionStore } from '@/stores/sessionStore';
import { RouterLink } from 'vue-router';
import { carritoStore } from '@/stores/carritoStore';
import { onMounted, ref, watch } from 'vue';

const session = sessionStore();
const carrito = carritoStore();
const items = carrito.items;
const cantidadItems = ref(0);

onMounted(() => {
  cantidadItems.value = items.length;
});

watch (items, () =>{
  cantidadItems.value = items.length;
});

</script>

<style lang="css">
.bg-ferremas {
  background-color: #FFCB2E;
}

.user-greeting {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.carrito-img {
  padding: 3px;
  width: 2.5rem;
  height: 2rem;
  border-radius: 3px;
  transition: background-color, 0.3s;
}

.carrito-img:hover {
  background-color: #f0ac54;
}

.notif {
  text-align: center;
  width: 1.8rem;
  font-size: 8pt;
  font-weight: bold;
  color: white;
}
</style>
