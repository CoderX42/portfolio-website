<template>
  <footer class="bg-apple-gray-light dark:bg-apple-gray-dark/30 border-t border-gray-200 dark:border-white/10">
    <div class="container-apple py-12">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span class="text-white text-xs font-bold">V</span>
            </div>
            <span class="font-semibold text-apple-black dark:text-white">{{ siteName }}</span>
          </div>
          <p class="text-sm text-apple-gray">{{ description }}</p>
        </div>

        <div>
          <h4 class="font-semibold text-apple-black dark:text-white mb-4">导航</h4>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-sm text-apple-gray hover:text-apple-black dark:hover:text-white transition-colors"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-apple-black dark:text-white mb-4">社交</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-apple-gray hover:text-apple-black dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-apple-gray hover:text-apple-black dark:hover:text-white transition-colors"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-apple-black dark:text-white mb-4">联系</h4>
          <ul class="space-y-2">
            <li class="text-sm text-apple-gray">
              hello@example.com
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
        <p class="text-xs text-apple-gray text-center">
          © {{ currentYear }} {{ siteName }}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const siteName = import.meta.env.VITE_SITE_NAME || 'Vibe Coding';
const description = import.meta.env.VITE_SITE_DESCRIPTION || '专注于 AI 辅助编程，探索前沿技术与创意实践';
const currentYear = new Date().getFullYear();

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/projects', label: '作品' },
  { path: '/about', label: '关于' },
  { path: '/contact', label: '联系' },
];
</script>
