<template>
  <div class="row d-flex align-content-center justify-content-center">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
      <h3>Registrarse</h3>
      <form @submit.prevent="onSubmit(input.username, input.password, input.email)" class="form mb-2">
        <div class="form-field">
          <div class="mb-3">
            <label for="username" class="form-label">Nombre de usuario</label>
            <input id="username" type="text" class="form-control" v-model="input.username" placeholder="usuario98">
            <div v-if="errors.username" v-for="error in errors.username">
              <p class="error">{{ error }}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input id="email" type="email" class="form-control" v-model="input.email" placeholder="ejemplo@gmail.com">
            <div v-if="errors.email" v-for="error in errors.email">
              <p class="error">{{ error }}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input id="password" type="password" class="form-control" v-model="input.password">
            <div v-if="errors.password" v-for="error in errors.password">
              <p class="error">{{ error }}</p>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-success">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? <RouterLink to="login">Inicia Sesión</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter} from 'vue-router';
import { sessionStore } from '@/stores/sessionStore';

const session = sessionStore();
const router = useRouter();
const input = ref(
  {
    username: "",
    password: "",
    email: "",
  }
);
const registering = ref(false);
const errors = ref(new Object())
async function onSubmit(username, password, email) {
  errors.value = new Object();

  registering.value = true;
  let response = await session.register(username, password, email);
  registering.value = false;
  if (response === 'sucess') {
    alert("Se ha registrado con éxito ahora puede iniciar sesión");
    router.push("login");
  } else {
    errors.value = response;
  }
}
</script>

<style scoped>
.form {
  padding: 2rem 1.5rem;
  background-color: #f3f3ed;
  border-radius: 0.4rem;
}
.error {
  color: #b11515f6;
  font-size: 10pt;
  margin: 0;
  height: 10pt;
}
</style>