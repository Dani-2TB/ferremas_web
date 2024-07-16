<template>
<h2 class="display-5 mb-3">Productos Destacados</h2>
<div class="row">
  <div v-for="producto in destacados" :key="producto.id" class="col-12 col-md-6 col-lg-4 mb-3">
      <CardProducto 
        :id="producto.id" 
        :nombre="producto.nombre" 
        :precio="producto.precio"
        :cantidad="producto.cantidad"
        :marca="producto.nombre_marca"
      />
  </div>
</div>
</template>

<script setup>

import { onMounted, ref } from 'vue';

import CardProducto from '../productos/CardProducto.vue';

const destacados = ref(Array(0))

onMounted(async () => {
  let url = `${import.meta.env.VITE_API_URL}/productos/destacadosList`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    destacados.value = data;
  }
})

</script>