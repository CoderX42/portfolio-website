<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">关于我</h1>
    <div class="mt-8 prose max-w-none dark:prose-invert">
      <p class="text-lg text-gray-600 dark:text-gray-300">
        热爱 Vibe Coding，专注于 AI 辅助编程与创意开发。在这里分享我的项目实践与探索。
      </p>
      <p class="mt-4 text-gray-600 dark:text-gray-300">
        欢迎通过 <RouterLink to="/contact" class="text-primary-600 hover:underline dark:text-primary-400">联系方式</RouterLink> 与我交流。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
