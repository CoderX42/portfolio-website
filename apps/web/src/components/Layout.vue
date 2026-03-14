<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import Footer from './Footer.vue';
import BackToTop from './BackToTop.vue';
</script>
