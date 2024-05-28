<script setup>
  import { sessionStore } from '@/stores/sessionStore';
  const session = sessionStore();
  
  session.logout()

</script>

<template>
  <h2>Se ha cerrado sesión</h2>
  <p>Puede <RouterLink to="/login">volver a iniciar sesión</RouterLink> o <RouterLink to="/">volver al Inicio</RouterLink></p>
</template>
