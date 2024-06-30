<template>
<h1 v-if="$route.meta.type === 'add'">Agregar Producto</h1>
<h1 v-if="$route.meta.type === 'update'">Actualizar Producto</h1>
<ProductoForm class="producto-form py-3 px-4 mt-3 rounded"></ProductoForm>
</template>

<script setup>
import ProductoForm from "../../components/productos/admin/ProductoForm.vue"
</script>

<style>
.producto-form {
  background-color: rgb(240, 239, 237);
}
</style>