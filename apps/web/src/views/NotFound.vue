<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="container-app text-center">
      <div class="relative inline-block mb-8">
        <h1 class="text-[10rem] sm:text-[12rem] lg:text-[16rem] font-display font-bold text-surface-secondary dark:text-zinc-800 leading-none select-none">
          404
        </h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center shadow-xl shadow-brand-500/30">
            <svg class="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <h2 class="text-2xl sm:text-3xl font-display font-bold text-content-primary dark:text-white mb-4">
        页面不存在
      </h2>
      <p class="text-content-tertiary dark:text-zinc-400 mb-8 max-w-md mx-auto">
        抱歉，您访问的页面不存在或已被移除。让我们一起回到首页继续探索。
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink to="/" class="btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          返回首页
        </RouterLink>
        <RouterLink to="/projects" class="btn-secondary">
          浏览作品
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
