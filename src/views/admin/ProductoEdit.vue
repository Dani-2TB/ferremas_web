<template>
<h1 v-if="$route.meta.type === 'add'">Agregar Producto</h1>
<h1 v-if="$route.meta.type === 'update'">Actualizar Producto</h1>
<ProductoForm class="producto-form"></ProductoForm>
</template>

<script setup>
import ProductoForm from "../../components/productos/admin/ProductoForm.vue"
</script>
