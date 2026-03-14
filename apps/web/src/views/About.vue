<template>
  <div class="relative min-h-screen">
    <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 dark:opacity-15 pointer-events-none" />
    <div class="absolute top-1/3 -right-32 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl" />

    <div class="relative section-container py-16 lg:py-24">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl sm:text-5xl font-display font-bold text-zinc-900 dark:text-white animate-slide-up">
            关于我
          </h1>
          <div class="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-brand-500 to-accent-cyan animate-slide-up-delay-1" />
        </div>

        <div class="grid lg:grid-cols-5 gap-12 items-start">
          <div class="lg:col-span-2">
            <div class="relative">
              <div class="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-brand-500/20 to-accent-cyan/20 dark:from-brand-500/10 dark:to-accent-cyan/10 flex items-center justify-center">
                <div class="w-40 h-40 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-xl shadow-brand-500/30">
                  <span class="text-6xl font-display font-bold text-white">V</span>
                </div>
              </div>
              <div class="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center">
                <div class="text-center">
                  <div class="text-2xl font-display font-bold text-brand-600 dark:text-brand-400">5+</div>
                  <div class="text-xs text-zinc-500 dark:text-zinc-400">年经验</div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-3 space-y-8">
            <div class="card p-6">
              <h2 class="text-xl font-display font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                  <svg class="w-4 h-4 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
                开发者
              </h2>
              <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                热衷于探索 AI 辅助编程的可能性，专注于构建高质量的 Web 应用。我相信技术应该服务于创意，而不仅仅是工具。
              </p>
            </div>

            <div class="card p-6">
              <h2 class="text-xl font-display font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center">
                  <svg class="w-4 h-4 text-accent-cyan-600 dark:text-accent-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
                探索者
              </h2>
              <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                持续关注前沿技术，拥抱新兴工具和方法。擅长将复杂的想法转化为优雅的解决方案。
              </p>
            </div>

            <div class="card p-6">
              <h2 class="text-xl font-display font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="w-8 h-8 rounded-lg bg-accent-pink/20 flex items-center justify-center">
                  <svg class="w-4 h-4 text-accent-pink-600 dark:text-accent-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                协作者
              </h2>
              <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                热爱与来自不同背景的人合作，共同创造有意义的项目。我相信最好的作品来自于思想的碰撞。
              </p>
            </div>
          </div>
        </div>

        <div class="mt-16">
          <h2 class="text-2xl font-display font-semibold text-zinc-900 dark:text-white mb-8 text-center">
            技术栈
          </h2>
          <div class="flex flex-wrap justify-center gap-3">
            <span
              v-for="tech in technologies"
              :key="tech"
              class="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:border-brand-300 dark:hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <div class="mt-16 text-center">
          <h2 class="text-2xl font-display font-semibold text-zinc-900 dark:text-white mb-4">
            让我们一起创造一些很棒的东西
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            我总是对新的项目和合作机会持开放态度。如果你有有趣的想法或想要合作，欢迎随时联系我。
          </p>
          <RouterLink to="/contact" class="btn-primary">
            联系我
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const technologies = [
  'JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js',
  'Python', 'Go', 'PostgreSQL', 'MongoDB', 'Docker',
  'AWS', 'GraphQL', 'Tailwind CSS', 'Git', 'AI/ML'
];
</script>
