<template>
  <div class="row d-flex align-items-center justify-content-center">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
      <h3>Iniciar Sesión</h3>
      <form @submit.prevent="onSubmit(input.username, input.password)" class="form mb-2">
        <div v-if="errors.notFound" v-for="error in errors.notFound">
          <p class="error mb-3">{{ error }}</p>
        </div>
        <div class="form-field">
          <div class="mb-3">
            <label for="username" class="form-label">Nombre de usuario</label>
            <input 
              id="username" type="text" class="form-control" v-model="input.username"
              minlength="3" maxlength="30"
            >
            <div v-if="errors.username" v-for="error in errors.username">
              <p class="error">{{ error }}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input 
              id="password" type="password" class="form-control" v-model="input.password"
              minlength="3" maxlength="30"
            >
            <div v-if="errors.password" v-for="error in errors.password">
              <p class="error">{{ error }}</p>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
      </form>
      <p>¿No tienes una cuenta? <RouterLink to="register">Registrate</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch} from 'vue';
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

const errors = ref(new Object());

const logginIn = ref(false);

async function onSubmit(username, password) {
  errors.value = new Object();

  let valid = true;

  if (input.value.username.length < 1) {
    errors.value.username = ["Este campo no puede estar en blanco"]
    valid = false;
  }

  if (input.value.password.length < 1) {
    errors.value.password = ["Este campo no puede estar en blanco"]
    valid = false;
  }

  if (!valid) return;

  logginIn.value = true;

  let response = await session.login(username, password);
  logginIn.value = false;
  if (response.sucess) {
    alert("Sesión iniciada con éxito!")
    router.push('/');
  } else {
    errors.value.notFound = ["Usuario o contraseña incorrectos"]
  }
}

watch(() => input.value.username, () => {
  errors.value.username = [];
})

watch(() => input.value.password, () => {
  errors.value.password = [];
})

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
  height: 10pt;
  margin: 0;
}
</style>