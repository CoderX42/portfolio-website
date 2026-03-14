<template>
  <div>
    <section class="relative overflow-hidden min-h-[85vh] flex items-center">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-40 dark:opacity-20" />
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />

      <div class="relative section-container">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 text-sm font-medium mb-8 animate-fade-in">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Vibe Coding 作品集
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-zinc-900 dark:text-white leading-tight animate-slide-up">
            用代码构建
            <span class="gradient-text"> 创意未来</span>
          </h1>

          <p class="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-slide-up-delay-1">
            {{ description }}
          </p>

          <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-delay-2">
            <RouterLink to="/projects" class="btn-primary group">
              <span>浏览作品</span>
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </RouterLink>
            <RouterLink to="/contact" class="btn-secondary">
              联系我
            </RouterLink>
          </div>

          <div class="mt-16 flex items-center justify-center gap-8 animate-slide-up-delay-3">
            <div class="text-center">
              <div class="text-3xl font-display font-bold text-zinc-900 dark:text-white">{{ stats.projects }}+</div>
              <div class="text-sm text-zinc-500 dark:text-zinc-400">项目作品</div>
            </div>
            <div class="w-px h-12 bg-zinc-200 dark:bg-zinc-700" />
            <div class="text-center">
              <div class="text-3xl font-display font-bold text-zinc-900 dark:text-white">{{ stats.years }}+</div>
              <div class="text-sm text-zinc-500 dark:text-zinc-400">年经验</div>
            </div>
            <div class="w-px h-12 bg-zinc-200 dark:bg-zinc-700" />
            <div class="text-center">
              <div class="text-3xl font-display font-bold text-zinc-900 dark:text-white">{{ stats.technologies }}+</div>
              <div class="text-sm text-zinc-500 dark:text-zinc-400">技术栈</div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-600 flex items-start justify-center p-2">
          <div class="w-1 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>

    <section class="relative py-20 lg:py-28 bg-white dark:bg-zinc-950">
      <div class="section-container">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 class="text-3xl sm:text-4xl font-display font-bold text-zinc-900 dark:text-white">
              精选作品
            </h2>
            <p class="mt-2 text-zinc-600 dark:text-zinc-400">
              探索我在 AI 辅助编程领域的探索与实践
            </p>
          </div>
          <RouterLink
            to="/projects"
            class="group inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-medium hover:gap-3 transition-all duration-300"
          >
            查看全部
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </RouterLink>
        </div>

        <div v-if="loading" class="flex justify-center py-16">
          <div class="relative">
            <div class="w-12 h-12 border-4 border-brand-200 dark:border-brand-800 rounded-full animate-spin" />
            <div class="absolute inset-0 w-12 h-12 border-4 border-brand-500 rounded-full animate-spin border-t-transparent" />
          </div>
        </div>

        <div v-else-if="projects.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project._id"
            :project="project"
            class="animate-slide-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          />
        </div>

        <div
          v-else
          class="relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center"
        >
          <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
          <div class="relative">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <svg class="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p class="text-zinc-500 dark:text-zinc-400">暂无作品，敬请期待</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-20 lg:py-28 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 dark:opacity-15" />
      <div class="absolute top-0 left-1/4 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl" />

      <div class="relative section-container">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-display font-bold text-zinc-900 dark:text-white">
            有个项目想法？
          </h2>
          <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            让我帮你把创意变成现实。无论是一个简单的原型还是复杂的产品，我都可以提供帮助。
          </p>
          <div class="mt-8">
            <RouterLink to="/contact" class="btn-primary">
              开始合作
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import ProjectCard from '@/components/ProjectCard.vue';
import { projectApi } from '@/utils/api';

const description = import.meta.env.VITE_SITE_DESCRIPTION || '探索 AI 辅助编程的创意与实践，分享前沿技术项目';
const projects = ref<Awaited<ReturnType<typeof projectApi.getList>>['data']['items']>([]);
const loading = ref(true);

const stats = ref({
  projects: 12,
  years: 5,
  technologies: 20,
});

onMounted(async () => {
  try {
    const { data } = await projectApi.getList({ limit: 6 });
    projects.value = data.items;
  } catch {
    projects.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
