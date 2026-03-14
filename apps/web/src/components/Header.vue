<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800/50 shadow-sm'
        : 'bg-transparent'
    ]"
  >
    <nav class="section-container">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <RouterLink
          to="/"
          class="group flex items-center gap-3"
        >
          <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow duration-300">
            <span class="text-white font-bold text-lg">V</span>
            <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span class="hidden sm:block font-display font-semibold text-lg text-zinc-900 dark:text-white">
            {{ siteName }}
          </span>
        </RouterLink>

        <div class="flex items-center gap-2 lg:gap-4">
          <RouterLink
            v-for="(item, index) in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link relative px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            {{ item.label }}
            <span class="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-brand-500 to-accent-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
          </RouterLink>

          <div class="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-2 hidden lg:block" />

          <ThemeToggle />
        </div>
      </div>
    </nav>
  </header>

  <div class="h-16 lg:h-20" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

const siteName = import.meta.env.VITE_SITE_NAME || 'Vibe Coding';
const navItems = [
  { path: '/', label: '首页' },
  { path: '/projects', label: '作品' },
  { path: '/about', label: '关于' },
  { path: '/contact', label: '联系' },
];

const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.nav-link.router-link-active {
  @apply text-zinc-900 dark:text-white;
}

.nav-link.router-link-active::after {
  @apply scale-x-100;
}
</style>
