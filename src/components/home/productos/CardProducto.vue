<template>

<div class="card px-0 py-0">
  <img src="/src/assets/images/template.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{ $props.nombre }}</h5>
    <p class="card-subtitle text-body-secondary">Stock: {{ $props.cantidad || 'Agotado' }}</p>
    <p class="card-text">Precio: ${{ $props.precio || 0 }}</p>
    <div class="d-flex flex-row flex-wrap gap-2">
      <a href="#" class="btn btn-primary flex-grow-0">Ver más</a>
      <a href="#" class="btn btn-success flex-grow-0">Agregar al carrito</a>
    </div>
  </div>
</div><div class=""></div>

</template>

<script setup>

defineProps({
  nombre: String,
  precio: Number,
  cantidad: Number
})

</script>

<style scoped>
.btn {
  max-height: 3rem;
}
</style>