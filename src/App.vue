<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import HeaderHero from './components/HeaderHero.vue';
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>

<header>
  <NavBar />
  <HeaderHero />
</header>
<section class="container py-4 content-body">
  <RouterView />
</section>
<FooterComponent />
</template>

<style scoped>
</style>
