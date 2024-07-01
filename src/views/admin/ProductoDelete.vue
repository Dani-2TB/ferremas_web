<template>
  <div class="row">
    <div class="col">
      <h1 class="mb-3">¿Desea eliminar el producto?</h1>
      <RouterLink class="btn btn-primary me-3" to="/admin">No Eliminar</RouterLink>
      <button @click="eliminarProducto($route.params.id)" class="btn btn-danger">Eliminar</button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

async function eliminarProducto(id) {
  const url = `${import.meta.env.VITE_API_URL}/productos/productoDetalle/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    alert("Producto eliminado con éxito.")
    router.push('/admin');
  }
}
</script>