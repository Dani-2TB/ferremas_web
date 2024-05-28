<script setup>
import { ref, onMounted, defineModel } from 'vue';

const categorias = ref();
const fetching = ref(true);
const categoriaSelect = defineModel();

async function fetchCategorías() {
  const url = 'http://192.168.100.99:8000/api/productos/categoriaList';
  await fetch(url,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => {
    response.json()
    .then((data) => {
      categorias.value = data;
      fetching.value = false;
    });
  });
}

onMounted(() => {
  fetchCategorías();
})

function selectCategoria(id, nombre) {
  categoriaSelect.value = {id: id, nombre: nombre};
}

</script>

<template>

<h4 class="h4">Categorías</h4>

<div id="sidebar" class="rounded px-1 py-4">

  <div v-if="fetching" class="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
    <h3 class="text-center">Cargando Categorías</h3>
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <nav v-else class="menu nav nav-pills px-2">

    <div v-for="categoria in categorias" :key="categoria.id" class="w-100">
      <div class="categoria fw-bold fs-5 mb-2">{{ categoria.nombre }}</div>
      <div v-if="categoria.sub_categorias">

        <div v-for="subcat1 in categoria.sub_categorias" :key="subcat1.id">
          <div class="nav-item" @click="subcat1.sub_categorias.length === 0 ? selectCategoria(subcat1.id, subcat1.nombre) : undefined">
            <div class="categoria ps-4" :class="[ subcat1.sub_categorias.length > 0 ? 'fw-bold' : 'nav-link']">{{ subcat1.nombre }}</div>
          </div>
          <div v-if="subcat1.sub_categorias">

            <div v-for="subcat2 in subcat1.sub_categorias" :key="subcat2.id">
              <div class="nav-item" @click="selectCategoria(subcat2.id, subcat2.nombre)">
                <div class="categoria nav-link ps-5">{{subcat2.nombre}}</div>
              </div>
            </div>

          </div>
        </div>
        <hr>
      </div>
    </div>

  </nav>
</div>

</template>

<style scoped>

#sidebar {
  width: 100%;
  background-color: #ffffff;
}

.categoria.nav-link:hover {
  background-color: #fff5d8;
}

.categoria {
  color: #000000;
  font-size: 12pt;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

@media screen and (max-width: 1199px) {
  .menu {
    width: 100%;
    max-height: 10rem;
    overflow-y: scroll;
  }
}

</style>
