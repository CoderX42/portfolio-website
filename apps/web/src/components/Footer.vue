<template>
  <footer class="mt-auto border-t border-surface-tertiary dark:border-white/5 bg-surface-secondary dark:bg-zinc-900/50">
    <div class="container-app py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <span class="text-white font-bold text-lg">V</span>
            </div>
            <span class="font-display font-semibold text-lg text-content-primary dark:text-white">
              {{ siteName }}
            </span>
          </div>
          <p class="text-content-tertiary dark:text-zinc-400 max-w-md leading-relaxed">
            {{ description }}
          </p>
          <div class="flex gap-3 mt-6">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 border border-surface-tertiary dark:border-zinc-700 flex items-center justify-center text-content-tertiary dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-md transition-all duration-300"
            >
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-display font-semibold text-content-primary dark:text-white mb-4">快速链接</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-content-tertiary dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-display font-semibold text-content-primary dark:text-white mb-4">联系方式</h4>
          <ul class="space-y-3 text-content-tertiary dark:text-zinc-400">
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hello@example.com
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-surface-tertiary dark:border-zinc-800">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-content-quaternary dark:text-zinc-500">
          <p>© {{ currentYear }} {{ siteName }}. All rights reserved.</p>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
            运行正常
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { RouterLink } from 'vue-router';

const siteName = import.meta.env.VITE_SITE_NAME || 'Vibe Coding';
const description = import.meta.env.VITE_SITE_DESCRIPTION || '探索 AI 辅助编程的创意与实践，分享前沿技术项目';
const currentYear = new Date().getFullYear();

const GithubIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' })
  ])
};

const TwitterIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' })
  ])
};

const socials = [
  { name: 'GitHub', url: 'https://github.com', icon: GithubIcon },
  { name: 'Twitter', url: 'https://twitter.com', icon: TwitterIcon },
];

const footerLinks = [
  { path: '/', label: '首页' },
  { path: '/projects', label: '作品集' },
  { path: '/about', label: '关于我' },
  { path: '/contact', label: '联系方式' },
];
</script>
