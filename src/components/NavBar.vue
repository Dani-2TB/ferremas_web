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
            <RouterLink class="nav-link" to="/carrito">
              <img class="carrito-img" src="../assets/images/cart.svg">
            </RouterLink>
          </li>
          <li 
            v-if="session.isLoggedIn && session.rol === 'admin'" 
            class="nav-item"
          >
            <RouterLink class="nav-link" to="#">Administrar</RouterLink>
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
const session = sessionStore();
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
  width: 2rem;
  border-radius: 3px;
  transition: background-color, 0.3s;
}

.carrito-img:hover {
  background-color: #ff9f72;
}
</style>
