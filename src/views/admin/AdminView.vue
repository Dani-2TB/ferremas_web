<template>
  <h1>Administrar Productos</h1>
  <div class="row">
    <div class="col-12 mb-3">
      <RouterLink to="/productos/add"><a class="btn btn-success">Agregar Producto</a></RouterLink>
    </div>
    <div class="col-12">
      <ProductosMain/>
    </div>
  </div>
</template>

<script setup>
import ProductosMain from '@/components/productos/ProductosMain.vue';
</script>