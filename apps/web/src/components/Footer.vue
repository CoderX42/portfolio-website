<template>
  <footer class="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
    <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          © {{ new Date().getFullYear() }} {{ siteName }}. Vibe Coding 作品集.
        </p>
        <div class="flex gap-6">
          <RouterLink
            to="/about"
            class="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          >
            关于我
          </RouterLink>
          <RouterLink
            to="/contact"
            class="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          >
            联系方式
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const siteName = import.meta.env.VITE_SITE_NAME || '作品集';
</script>
