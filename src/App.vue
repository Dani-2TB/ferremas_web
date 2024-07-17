<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>

<header>
  <NavBar />
</header>
<section class="container py-4 content-body">
  <RouterView />
</section>
<FooterComponent />
</template>

<style scoped>
</style>
