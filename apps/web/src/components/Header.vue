<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="text-xl font-bold text-primary-600 dark:text-primary-400">
        {{ siteName }}
      </RouterLink>
      <div class="flex items-center gap-6">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
          active-class="text-primary-600 font-medium dark:text-primary-400"
        >
          {{ item.label }}
        </RouterLink>
        <ThemeToggle />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

const siteName = import.meta.env.VITE_SITE_NAME || '作品集';
const navItems = [
  { path: '/', label: '首页' },
  { path: '/projects', label: '作品' },
  { path: '/about', label: '关于' },
  { path: '/contact', label: '联系' },
];
</script>
