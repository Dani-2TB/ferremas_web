<template>
  <nav class="navbar navbar-expand-lg bg-body sticky-top shadow-sm" data-bs-theme = 'dark'>
    <div class="container"> 
      <RouterLink to="/" class="navbar-brand">
        <img src="../assets/images/logo.png" alt="logo" class="nav-logo">
        Ferremás
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Abrir Navegación">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-3 me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Inicio</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="nosotros">Nosotros</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="contacto">Contacto</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>