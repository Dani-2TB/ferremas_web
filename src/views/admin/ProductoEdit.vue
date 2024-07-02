<template>
<h1 v-if="$route.meta.type === 'add'" class="mb-3">Agregar Producto</h1>
<h1 v-if="$route.meta.type === 'update'" class="mb-3">Actualizar Producto</h1>
<ProductoForm/>
</template>

<script setup>
import ProductoForm from "../../components/productos/admin/ProductoForm.vue"
</script>
