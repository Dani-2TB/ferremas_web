<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
      <h3>Iniciar Sesión</h3>
      <form action="submit" class="form mb-2">
        <div class="form-field">
          <div class="mb-3">
            <label for="username" class="form-label">Nombre de usuario</label>
            <input id="username" type="text" class="form-control" v-model="input.username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input id="password" type="password" class="form-control" v-model="input.password">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
      </form>
      <p>¿No tienes una cuenta? <RouterLink to="/">Registrate</RouterLink></p>
    </div>
  </div>
  </template>

<script setup>
import { ref } from 'vue';

const input = ref(
  {
    username: "",
    password: ""
  }
)
</script>

<style scoped>
.form {
  padding: 2rem 1.5rem;
  background-color: rgb(236, 236, 233);
  border-radius: 0.4rem;
}
</style>