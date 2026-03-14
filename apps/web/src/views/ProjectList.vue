<template>
  <div class="min-h-screen">
    <div class="bg-apple-gray-light dark:bg-apple-gray-dark/30 py-16">
      <div class="container-apple">
        <h1 class="text-4xl sm:text-5xl font-bold text-apple-black dark:text-white">
          作品
        </h1>
        <p class="mt-4 text-apple-gray text-lg">
          探索所有项目
        </p>
      </div>
    </div>

    <div class="container-apple py-12">
      <div class="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <input
          v-model="search"
          type="text"
          placeholder="搜索项目..."
          class="flex-1 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-apple-black text-apple-black dark:text-white placeholder:text-apple-gray focus:outline-none focus:border-apple-blue transition-colors"
          @keyup.enter="page = 1; fetchProjects()"
        />
        <select
          v-model="categoryId"
          class="px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-apple-black text-apple-black dark:text-white focus:outline-none focus:border-apple-blue transition-colors"
          @change="page = 1; fetchProjects()"
        >
          <option value="">全部分类</option>
          <option v-for="c in categories" :key="c._id" :value="c._id">{{ c.name }}</option>
        </select>
      </div>

      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-8 h-8 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
      </div>

      <template v-else>
        <div v-if="projects.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 fade-in-stagger">
          <ProjectCard
            v-for="project in projects"
            :key="project._id"
            :project="project"
          />
        </div>

        <div v-else class="text-center py-16">
          <p class="text-apple-gray text-lg">暂无匹配作品</p>
        </div>

        <div v-if="totalPages > 1" class="mt-12 flex justify-center gap-2">
          <button
            :disabled="page <= 1"
            class="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-apple-gray hover:border-apple-blue hover:text-apple-blue disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            @click="page--; fetchProjects()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span class="flex items-center px-4 text-sm text-apple-gray">
            {{ page }} / {{ totalPages }}
          </span>

          <button
            :disabled="page >= totalPages"
            class="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-apple-gray hover:border-apple-blue hover:text-apple-blue disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            @click="page++; fetchProjects()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { projectApi, categoryApi } from '@/utils/api';
import type { ProjectListItem, Category } from '@/utils/api';

const projects = ref<ProjectListItem[]>([]);
const categories = ref<Category[]>([]);
const loading = ref(true);
const page = ref(1);
const totalPages = ref(1);
const categoryId = ref('');
const search = ref('');

async function fetchProjects() {
  loading.value = true;
  try {
    const { data } = await projectApi.getList({
      page: page.value,
      limit: 12,
      categoryId: categoryId.value || undefined,
      search: search.value || undefined,
    });
    projects.value = data.items;
    totalPages.value = data.totalPages;
  } catch {
    projects.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  try {
    const { data } = await categoryApi.getAll();
    categories.value = data;
  } catch {
    categories.value = [];
  }
  fetchProjects();
});
</script>
