<script setup>
  import SideBar from './SideBar.vue';
  import CardProducto from './CardProducto.vue'
  import { ref, watch } from 'vue';

  const categoriaSelect = ref(0);
  const productosArray = ref(Array(0));
  const cargandoProductos = ref(false);
  const fetchOk = ref(true);

  watch(categoriaSelect, fetchProductos)

  async function fetchProductos() {
    console.log("Cargando Productos")
    cargandoProductos.value = true;
    fetchOk.value = false;
    
    let id_categoria = categoriaSelect.value.id;
    let url = `${import.meta.env.VITE_API_URL}/productos/productoCategoriaList/${id_categoria}`;

    try {
      const response = await fetch(url, {method: "GET", headers: {"Content-Type": "application/json"}});
      if (response.ok) {
        fetchOk.value = true;
        response.json().then((data) => {
          productosArray.value = data;
          console.log(productosArray.value)
        });
      }
    } catch(err) {
      fetchOk.value = false;
    } finally {
      cargandoProductos.value = false;
    }
  }
</script>

<template>
  <h3 class="h1 mb-4"> Nuestros Productos </h3>
  <div id="productos" class="row px-1 py-4 rounded">
    <div class="col-12 col-xl-3">
      <SideBar v-model="categoriaSelect" />
    </div>
    <div class="col-12 col-xl-9 d-flex flex-column">
      <h4 class="h4 mt-3 mt-xl-0">{{ categoriaSelect === 0 ? 'Seleccione una categoría' : categoriaSelect.nombre }}</h4>
      <div v-if="cargandoProductos" class="h-25 d-flex align-items-center justify-content-center">
        <p class="fl-3">Cargando Productos...</p>
      </div>
      <div v-if="fetchOk" class="row g-3">
          <div v-for="producto in productosArray" :key="producto.id" class="col-12 col-sm-6 col-xl-4">
            <CardProducto :nombre="producto.nombre" :precio="producto.precio" :cantidad="producto.cantidad" />
          </div>
      </div>
      <div v-else class="h-100 d-flex justify-content-center mt-5">
        <p class="fs-3">Lo sentimos, no hay productos en esta categoría 😔</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

  #productos {
    background-color: #EEEEEE;
  }

</style>