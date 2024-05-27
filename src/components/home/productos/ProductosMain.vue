<script setup>
  import SideBar from './SideBar.vue';
  import { ref } from 'vue';

  const categoriaSelect = ref(0);

</script>

<template>
  <h3> Productos </h3>
  <div id="productos" class="row px-1 py-4 rounded">
    <div class="col-12 col-md-3">
      <SideBar v-model="categoriaSelect" />
    </div>
    <div class="col-12 col-md-9">
      <h2>{{ categoriaSelect }}</h2>
    </div>
  </div>
</template>

<style scoped>

  #productos {
    background-color: #EEEEEE;
  }

</style>