<template>
  <div>
    <section class="relative">
      <HeroGeometric>
        <template #default>
          <div class="pt-32 pb-40">
            <div class="flex flex-col items-center justify-center gap-8 mt-16">
              <div class="flex flex-col sm:flex-row items-center justify-center gap-5">
                <RouterLink to="/projects" class="btn-primary group text-base px-8 py-4">
                  <span>浏览作品</span>
                  <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </RouterLink>
                <RouterLink to="/contact" class="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20">
                  联系我
                </RouterLink>
              </div>

              <div class="flex items-center justify-center gap-10 mt-8">
                <div class="text-center">
                  <div class="text-4xl font-bold text-white">{{ stats.projects }}+</div>
                  <div class="text-sm text-white/50 mt-1">项目作品</div>
                </div>
                <div class="w-px h-10 bg-white/20" />
                <div class="text-center">
                  <div class="text-4xl font-bold text-white">{{ stats.years }}+</div>
                  <div class="text-sm text-white/50 mt-1">年经验</div>
                </div>
                <div class="w-px h-10 bg-white/20" />
                <div class="text-center">
                  <div class="text-4xl font-bold text-white">{{ stats.technologies }}+</div>
                  <div class="text-sm text-white/50 mt-1">技术栈</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </HeroGeometric>
    </section>

    <section class="relative py-24 lg:py-32 bg-surface-light dark:bg-zinc-950">
      <div class="container-app">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
          <div>
            <h2 class="text-4xl sm:text-5xl font-display font-bold text-content-primary dark:text-white">
              精选作品
            </h2>
            <p class="mt-3 text-lg text-content-tertiary dark:text-zinc-400">
              探索我在 AI 辅助编程领域的探索与实践
            </p>
          </div>
          <RouterLink
            to="/projects"
            class="group inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-medium hover:gap-3 transition-all duration-300"
          >
            查看全部
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        <div v-else-if="projects.length" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 stagger-fade-in">
          <ProjectCard
            v-for="project in projects.slice(0, 6)"
            :key="project._id"
            :project="project"
          />
        </div>

        <div
          v-else
          class="relative overflow-hidden rounded-3xl border-2 border-dashed border-surface-tertiary dark:border-zinc-800 p-16 text-center"
        >
          <div class="absolute inset-0 bg-dots opacity-30" />
          <div class="relative">
            <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-secondary dark:bg-zinc-800 flex items-center justify-center">
              <svg class="w-10 h-10 text-content-quaternary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p class="text-xl font-medium text-content-primary dark:text-white mb-2">暂无作品，敬请期待</p>
            <p class="text-content-tertiary dark:text-zinc-400">精彩项目正在准备中...</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-24 lg:py-32 bg-[#030303] overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div class="relative container-app">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
            有个项目想法？
          </h2>
          <p class="text-xl text-white/50 mb-10">
            让我帮你把创意变成现实。无论是一个简单的原型还是复杂的产品，我都可以提供帮助。
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <RouterLink to="/contact" class="btn-primary text-base px-10 py-4">
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
import HeroGeometric from '@/components/HeroGeometric.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { projectApi } from '@/utils/api';

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
