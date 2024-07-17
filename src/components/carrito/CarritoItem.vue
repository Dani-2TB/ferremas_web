<template>
  <div class="col-12 bg-white p-3 rounded border mb-3">
    <div class="row">
      <h3>{{ carritoItem.producto.nombre }}</h3>
      <p>Stock: {{ carritoItem.producto.cantidad }}</p>
      <div class="d-flex mb-3">
        <button @click="borrarItem" class="btn btn-danger">Eliminar del carrito</button>
      </div>
    </div>
    
    <div class="row">
      <div class="col-3 d-flex">
        <button @click="reducirCantidad" class="btn btn-danger me-2">-</button>
        <div class="border rounded px-3 me-2 text-center align-items-center d-flex me-2">{{ carritoItem.cantidad }}</div>
        <button @click="aumentarCantidad" class="btn btn-success">+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { carritoStore } from "@/stores/carritoStore"

const carrito = carritoStore();
const props = defineProps({
  carritoItem: Object
});

async function aumentarCantidad() {
  let url = `${import.meta.env.VITE_API_URL}/productos/productoDetalle/${props.carritoItem.producto.id}`;
  const response = await fetch(url)
  if (response.ok) {
    const producto = await response.json();
    if (producto.cantidad < props.carritoItem.cantidad + 1) {
      return;
    }
    carrito.carritoAdd({producto: producto, cantidad: 1})
    carrito.updateTotal()
    return;
  }
}

async function reducirCantidad() {
  let url = `${import.meta.env.VITE_API_URL}/productos/productoDetalle/${props.carritoItem.producto.id}`;
  const response = await fetch(url)
  if (response.ok) {
    const producto = await response.json();
    if (props.carritoItem.cantidad - 1 < 1) {
      console.log("No se puede reducir más");
      return;
    }
    carrito.carritoRemove({producto: producto, cantidad: 1})
    carrito.updateTotal()
    return;
  }
}

function borrarItem() {
  carrito.carritoDelete(props.carritoItem.producto.id);
  carrito.updateTotal();
}

</script>