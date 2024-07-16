<script setup>
import { carritoStore } from '@/stores/carritoStore';
import CarritoItem from '../components/carrito/CarritoItem.vue'

const storeCarrito = carritoStore()
function pagar() {
  window.open(`${import.meta.env.VITE_API_URL}/tbk/crearTransaccion/${storeCarrito.total}`)
}

</script>

<template>
  <h1>Items en tu carrito</h1>
  <div class="row justify-content-center">
    <div class="carrito col-12 col-md-10 col-lg-8 align-items-center rounded p-2">
      <div v-if="storeCarrito.items.length === 0" class="text-center">
        <h2>No hay items en tu carrito 🥺</h2>
      </div>
      <div v-else>
        <div v-for="item in storeCarrito.items" :key="item.producto.id">
          <CarritoItem :carritoItem="item"></CarritoItem>
        </div>
      </div>
      <div v-if="storeCarrito.total > 0">
        <hr>
        <div class="d-flex flex-column">
          <p class="fs-4 me-3 align-self-end">
            Total: {{ storeCarrito.total }}
          </p>
        </div>
        <button @click="pagar" class="btn btn-success px-5">Pagar</button>
      </div>
    </div>
  </div>
</template>
