<template>
  <div>
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-apple-black dark:to-apple-black" />

      <div class="relative container-apple text-center pt-20">
        <div class="animate-fade-in">
          <p class="text-sm font-semibold text-apple-blue mb-4">{{ siteName }}</p>
          <h1 class="text-hero-sm sm:text-hero lg:text-hero-lg font-bold text-apple-black dark:text-white leading-tight animate-fade-in-up">
            用代码<br class="sm:hidden" />创造<br class="hidden sm:block" />未来
          </h1>
        </div>

        <p class="mt-6 text-lg sm:text-xl text-apple-gray max-w-2xl mx-auto animate-fade-in-up" style="animation-delay: 200ms;">
          {{ description }}
        </p>

        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style="animation-delay: 400ms;">
          <RouterLink to="/projects" class="btn-apple">
            探索作品
          </RouterLink>
          <RouterLink to="/contact" class="btn-apple-secondary">
            联系我
          </RouterLink>
        </div>

        <div class="mt-20 animate-fade-in-up" style="animation-delay: 600ms;">
          <div v-if="loading" class="flex justify-center py-8">
            <div class="w-8 h-8 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
          </div>
          <div v-else-if="projects.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              v-for="(project, index) in projects.slice(0, 3)"
              :key="project._id"
              :project="project"
              class="animate-fade-in-up"
              :style="{ animationDelay: `${800 + index * 150}ms` }"
            />
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-apple-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <section class="section-apple bg-apple-gray-light dark:bg-apple-gray-dark/30">
      <div class="container-apple">
        <div class="text-center mb-16">
          <h2 class="text-section font-bold text-apple-black dark:text-white">
            精选项目
          </h2>
          <p class="mt-4 text-apple-gray max-w-xl mx-auto">
            探索我在 AI 辅助编程领域的探索与实践
          </p>
        </div>

        <div v-if="loading" class="flex justify-center py-12">
          <div class="w-8 h-8 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
        </div>

        <div v-else-if="projects.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 fade-in-stagger">
          <ProjectCard
            v-for="project in projects.slice(0, 6)"
            :key="project._id"
            :project="project"
          />
        </div>

        <div v-else class="text-center py-16">
          <p class="text-apple-gray">暂无作品</p>
        </div>

        <div v-if="projects.length > 6" class="mt-12 text-center">
          <RouterLink to="/projects" class="text-apple-blue hover:underline text-sm font-semibold">
            查看全部项目 →
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section-apple">
      <div class="container-apple text-center">
        <h2 class="text-3xl sm:text-section font-bold text-apple-black dark:text-white">
          让我们一起创造
        </h2>
        <p class="mt-4 text-apple-gray max-w-lg mx-auto">
          有个项目想法？我很乐意帮助你将其变为现实
        </p>
        <div class="mt-8">
          <RouterLink to="/contact" class="btn-apple">
            开始对话
          </RouterLink>
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

const siteName = import.meta.env.VITE_SITE_NAME || 'Vibe Coding';
const description = import.meta.env.VITE_SITE_DESCRIPTION || '专注于 AI 辅助编程，探索前沿技术与创意实践';
const projects = ref<Awaited<ReturnType<typeof projectApi.getList>>['data']['items']>([]);
const loading = ref(true);

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
