<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">作品列表</h1>
    <p class="mt-2 text-gray-600 dark:text-gray-300">浏览所有 Vibe Coding 作品</p>

    <div class="mt-8 flex flex-wrap gap-4">
      <select
        v-model="categoryId"
        class="rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        @change="page = 1; fetchProjects()"
      >
        <option value="">全部分类</option>
        <option v-for="c in categories" :key="c._id" :value="c._id">{{ c.name }}</option>
      </select>
      <input
        v-model="search"
        type="text"
        placeholder="搜索..."
        class="rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        @keyup.enter="fetchProjects"
      />
      <button
        class="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        @click="page = 1; fetchProjects()"
      >
        搜索
      </button>
    </div>

    <div v-if="loading" class="mt-12 flex justify-center py-12">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
    </div>
    <template v-else>
      <ProjectGrid v-if="projects.length" :projects="projects" class="mt-8" />
      <div v-else class="mt-12 rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
        暂无作品
      </div>
      <div v-if="totalPages > 1" class="mt-8 flex justify-center gap-2">
        <button
          :disabled="page <= 1"
          class="rounded px-4 py-2 disabled:opacity-50"
          @click="page--; fetchProjects()"
        >
          上一页
        </button>
        <span class="flex items-center px-4">第 {{ page }} / {{ totalPages }} 页</span>
        <button
          :disabled="page >= totalPages"
          class="rounded px-4 py-2 disabled:opacity-50"
          @click="page++; fetchProjects()"
        >
          下一页
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProjectGrid from '@/components/ProjectGrid.vue';
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
