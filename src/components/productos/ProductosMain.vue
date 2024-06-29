<template>
  <h3 class="h1 mb-4"> Nuestros Productos </h3>
  <div id="productos" class="row px-1 py-3 rounded">
    
    <div class="col-12 col-xl-3 sidebar">
      <SideBar v-model="categoriaSelect" />
    </div>

    <div class="col-12 col-xl-9 d-flex flex-column productos">
      <h4 class="h4 mt-3 mt-xl-0">{{ categoriaSelect === 0 ? 'Seleccione una categoría' : categoriaSelect.nombre }}</h4>

      <div v-if="cargandoProductos" class="h-25 d-flex align-items-center justify-content-center">
        <p class="fl-3">Cargando Productos...</p>
      </div>

      <div v-if="fetchOk" class="row g-3">
          <div v-for="producto in productosArray.results" :key="producto.id" class="col-12 col-sm-6 col-xl-4">
            <CardProducto 
              :id="producto.id" 
              :nombre="producto.nombre" 
              :precio="producto.precio"
              :cantidad="producto.cantidad"
              :marca="producto.nombre_marca"
            />
          </div>
      </div>

      <div v-else class="h-100 d-flex justify-content-center mt-5">
        <p class="fs-3">Lo sentimos, no hay productos en esta categoría 😔</p>
      </div>
      
    </div>
    <div class="col-12 controls d-flex flex-row">
      <button v-if="productosArray.previous" @click="fetchProductos(productosArray.previous)" class="btn btn-primary d-block ms-auto">Anterior</button>
      <button v-if="productosArray.next" @click="fetchProductos(productosArray.next)" class="btn btn-primary d-block ms-auto">Siguiente</button>
    </div>

  </div>
</template>

<script setup>
  import SideBar from './SideBar.vue';
  import CardProducto from './CardProducto.vue'
  import { ref, watch } from 'vue';

  const categoriaSelect = ref(0);
  const productosArray = ref(Array(0));
  const cargandoProductos = ref(false);
  const fetchOk = ref(true);

  watch(categoriaSelect, () => {
    fetchProductos();
  })

  async function fetchProductos(url = "") {
    productosArray.value = []
    cargandoProductos.value = true;
    fetchOk.value = true;
    let id_categoria = categoriaSelect.value.id;

    if (url === "") {
      url = `${import.meta.env.VITE_API_URL}/productos/productoCategoriaList/${id_categoria}`;
    }

    const response = await fetch(url, {method: "GET", headers: {"Content-Type": "application/json"}});
    if (response.ok) {
      fetchOk.value = true;
      response.json()
      .then((data) => {
        productosArray.value = data;
      });
    } else { 
      fetchOk.value = false;
    }
    
    cargandoProductos.value = false;
  }
</script>

<style scoped>
  #productos {
    height: 60rem;
    overflow-y: hidden;
    background-color: #EEEEEE;
  }

  .sidebar {
    max-height: 94%;
    overflow-y: auto;
  }

  .productos {
    max-height: 90%;
    overflow-y:auto;
  }

  .controls {
    height: 3rem;
  }

  @media screen and (max-width: 1199px){
    .productos {
      height: 68%;
    }
  }

</style>
