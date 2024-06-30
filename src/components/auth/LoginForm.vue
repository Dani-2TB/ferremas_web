<script setup>
import { ref } from 'vue';
import { useRouter} from 'vue-router';
import { sessionStore } from '@/stores/sessionStore';

const router = useRouter();
const session = sessionStore();

const input = ref(
  {
    username: "",
    password: ""
  }
);

const logginIn = ref(false);

async function onSubmit(username, password) {
  logginIn.value = true;
  await session.login(username, password);
  logginIn.value = false;
  if (session.isLoggedIn) {
      router.push('/');
    }
  }
</script>

<template>
  <h2>
    {{ $route.meta.error }}
  </h2>
  <div class="row justify-content-center">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
      <h3>Iniciar Sesión</h3>
      <form @submit.prevent="onSubmit(input.username, input.password)" class="form mb-2">
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

<style scoped>
.form {
  padding: 2rem 1.5rem;
  background-color: #f3f3ed;
  border-radius: 0.4rem;
}
</style>