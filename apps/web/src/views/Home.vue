<template>
  <div>
    <section class="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Vibe Coding 作品集
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          {{ description }}
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <RouterLink
            to="/projects"
            class="rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700"
          >
            浏览作品
          </RouterLink>
          <RouterLink
            to="/contact"
            class="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            联系我
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="border-t border-gray-200 bg-white px-4 py-16 dark:border-gray-700 dark:bg-gray-800/50 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">精选作品</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-300">探索我在 AI 辅助编程领域的项目</p>
        <div v-if="loading" class="mt-8 flex justify-center py-12">
          <div class="h-8 w-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
        </div>
        <ProjectGrid v-if="projects.length" :projects="projects" class="mt-8" />
        <div v-else-if="!loading" class="mt-8 rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
          暂无作品，敬请期待
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import ProjectGrid from '@/components/ProjectGrid.vue';
import { projectApi } from '@/utils/api';

const description = import.meta.env.VITE_SITE_DESCRIPTION || '展示 AI 辅助编程的创意与实践';
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
