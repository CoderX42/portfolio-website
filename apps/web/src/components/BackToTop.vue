<template>
  <button
    v-if="visible"
    class="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-white dark:bg-zinc-800 border border-surface-tertiary dark:border-zinc-700 shadow-lg shadow-black/10 flex items-center justify-center text-content-secondary dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 transition-all duration-300 ease-out-expo"
    aria-label="返回顶部"
    @click="scrollToTop"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const visible = ref(false);

function handleScroll() {
  visible.value = window.scrollY > 500;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
