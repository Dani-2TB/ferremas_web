<script setup>
import { carritoStore } from '@/stores/carritoStore';
import { sessionStore } from '@/stores/sessionStore';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();
const session = sessionStore();
const carrito = carritoStore();

const props = defineProps({
  id: Number,
  nombre: String,
  precio: String,
  cantidad: Number,
  marca: String,
});

const inCarrito = ref(false);

async function carritoAdd() {
  const producto = await fetchProducto(props.id);
  const cantidad = 1;
  const data = {producto: producto, cantidad: cantidad}
  carrito.carritoAdd(data)
  carrito.updateTotal()
  inCarrito.value = true;
}

async function fetchProducto(id) {
  let url = `${import.meta.env.VITE_API_URL}/productos/productoDetalle/${id}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

function productoDelete(id) {
  router.push(`/productos/delete/${id}`);
}

function productoEdit(id) {
  router.push(`/productos/update/${id}`)
}

onMounted(() => {
  for (let i = 0; i < carrito.items.length; i++) {
    let item = carrito.items[i].producto;
    if (item.id === props.id) {
      inCarrito.value = true;
      return;
    }
  }
});

</script>

<template>

<div class="card px-0 py-0">
  <img src="/src/assets/images/template.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{ $props.nombre }}</h5>
    <p class="card-subtitle text-body-secondary">Stock: {{ $props.cantidad || 'Agotado' }}</p>
    <p class="card-text">
      Marca: {{ $props.marca ? $props.marca : 'Sin Marca' }} <br>
      Precio: ${{ $props.precio || 0 }}
    </p>
  </div>
  <div class="d-flex flex-row flex-wrap gap-2 ms-3 mb-3">
    <a @click="carritoAdd" class="btn btn-primary flex-grow-0" v-if="!inCarrito">Agregar al carro</a>
    <a @click="productoEdit(props.id)" class="btn btn-warning" v-if="session.rol === 'admin'">Editar</a>
    <a @click="productoDelete(props.id)" class="btn btn-danger" v-if="session.rol === 'admin'">Eliminar</a>
  </div>
</div>

</template>


<style scoped>
.btn {
  max-height: 3rem;
}
.hidden {
  display: none;
}
.card {
  min-height: 25rem;
}
</style>