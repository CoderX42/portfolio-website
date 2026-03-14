<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200/50 dark:border-white/10'
        : 'bg-transparent'
    ]"
  >
    <nav class="container-apple">
      <div class="flex items-center justify-between h-12 lg:h-14">
        <RouterLink
          to="/"
          class="flex items-center gap-2 text-sm font-semibold text-apple-black dark:text-white hover:opacity-70 transition-opacity"
        >
          <div class="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span class="text-white text-xs font-bold">V</span>
          </div>
          <span class="hidden sm:block">{{ siteName }}</span>
        </RouterLink>

        <div class="flex items-center gap-6">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="hidden sm:block text-sm text-apple-gray dark:text-gray-400 hover:text-apple-black dark:hover:text-white transition-colors duration-200"
          >
            {{ item.label }}
          </RouterLink>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  </header>

  <div class="h-12 lg:h-14" />
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
  isScrolled.value = window.scrollY > 10;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
