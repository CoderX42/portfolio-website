<template>
  <div class="relative min-h-screen">
    <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 dark:opacity-15 pointer-events-none" />

    <div class="relative section-container py-16 lg:py-24">
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-display font-bold text-zinc-900 dark:text-white animate-slide-up">
          作品列表
        </h1>
        <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400 animate-slide-up-delay-1">
          探索所有 Vibe Coding 项目
        </p>
      </div>

      <div class="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div class="relative flex-1">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="搜索项目..."
            class="input-field pl-12"
            @keyup.enter="page = 1; fetchProjects()"
          />
        </div>
        <select
          v-model="categoryId"
          class="input-field sm:w-48"
          @change="page = 1; fetchProjects()"
        >
          <option value="">全部分类</option>
          <option v-for="c in categories" :key="c._id" :value="c._id">{{ c.name }}</option>
        </select>
      </div>

      <div v-if="loading" class="flex justify-center py-16">
        <div class="relative">
          <div class="w-12 h-12 border-4 border-brand-200 dark:border-brand-800 rounded-full animate-spin" />
          <div class="absolute inset-0 w-12 h-12 border-4 border-brand-500 rounded-full animate-spin border-t-transparent" />
        </div>
      </div>

      <template v-else>
        <div v-if="projects.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project._id"
            :project="project"
            class="animate-slide-up"
            :style="{ animationDelay: `${index * 50}ms` }"
          />
        </div>

        <div
          v-else
          class="relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-16 text-center"
        >
          <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
          <div class="relative">
            <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <svg class="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-xl font-medium text-zinc-900 dark:text-white mb-2">暂无匹配作品</p>
            <p class="text-zinc-500 dark:text-zinc-400">试试调整搜索条件或筛选器</p>
          </div>
        </div>

        <div v-if="totalPages > 1" class="mt-12 flex items-center justify-center gap-2">
          <button
            :disabled="page <= 1"
            class="w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-brand-300 dark:hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-zinc-200 disabled:hover:text-zinc-600 transition-all duration-200"
            @click="page--; fetchProjects()"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div class="flex items-center gap-1">
            <template v-for="p in visiblePages" :key="p">
              <button
                v-if="p !== '...'"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200"
                :class="p === page
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'"
                @click="page = p as number; fetchProjects()"
              >
                {{ p }}
              </button>
              <span v-else class="w-10 h-10 flex items-center justify-center text-zinc-400">...</span>
            </template>
          </div>

          <button
            :disabled="page >= totalPages"
            class="w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-brand-300 dark:hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-zinc-200 disabled:hover:text-zinc-600 transition-all duration-200"
            @click="page++; fetchProjects()"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const total = totalPages.value;
  const current = page.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 2) pages.push('...');
    pages.push(total);
  }

  return pages;
});

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
