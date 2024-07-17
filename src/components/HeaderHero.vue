<template>
<div class="jumbo-img shadow-sm">
  <div class="mask py-5 px-2 text-white jumbo-mask shadow-sm">
    <div class="container py-5 px-2 py-lg-5 px-lg-5">
      <h1 class="display-5 fw-bold text-uppercase">{{ $route.meta.pageTitle || "default" }}</h1>
      <p v-if="$route.meta.pageSubtitle" class="col-md-8 fs-4 pb-1">{{ $route.meta.pageSubtitle || 'subtitle' }}</p>
    </div>
  </div>
</div>
</template>