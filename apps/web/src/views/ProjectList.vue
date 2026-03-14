<template>
  <div class="min-h-screen bg-surface-light dark:bg-zinc-950">
    <div class="container-app py-8 sm:py-12">
      <div class="mb-8">
        <h1 class="text-3xl sm:text-4xl font-display font-bold text-content-primary dark:text-white mb-2">
          作品集
        </h1>
        <p class="text-content-tertiary dark:text-zinc-400">
          探索我所有的项目作品
        </p>
      </div>

      <div class="mb-6 space-y-4">
        <div class="relative">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-quaternary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="搜索项目名称、标签..."
            class="input-field pl-12 pr-12"
            @input="handleSearch"
          />
          <button
            v-if="search"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-content-quaternary hover:text-content-primary dark:hover:text-white transition-colors"
            @click="search = ''; page = 1; fetchProjects()"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="categoryId === '' 
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' 
              : 'bg-white dark:bg-zinc-800 border border-surface-tertiary dark:border-zinc-700 text-content-secondary dark:text-zinc-400 hover:border-brand-300 dark:hover:border-brand-600'"
            @click="categoryId = ''; page = 1; fetchProjects()"
          >
            全部
          </button>
          <button
            v-for="category in categories"
            :key="category._id"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="categoryId === category._id 
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' 
              : 'bg-white dark:bg-zinc-800 border border-surface-tertiary dark:border-zinc-700 text-content-secondary dark:text-zinc-400 hover:border-brand-300 dark:hover:border-brand-600'"
            @click="categoryId = category._id; page = 1; fetchProjects()"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCardSkeleton v-for="i in 6" :key="i" />
      </div>

      <template v-else>
        <div v-if="projects.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-fade-in">
          <ProjectCard
            v-for="project in projects"
            :key="project._id"
            :project="project"
          />
        </div>

        <div
          v-else
          class="relative overflow-hidden rounded-2xl border-2 border-dashed border-surface-tertiary dark:border-zinc-800 p-16 text-center"
        >
          <div class="absolute inset-0 bg-dots opacity-30" />
          <div class="relative">
            <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-secondary dark:bg-zinc-800 flex items-center justify-center">
              <svg class="w-10 h-10 text-content-quaternary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-xl font-medium text-content-primary dark:text-white mb-2">暂无匹配作品</p>
            <p class="text-content-tertiary dark:text-zinc-400 mb-4">试试调整搜索条件或筛选器</p>
            <button 
              class="btn-secondary text-sm"
              @click="resetFilters"
            >
              清空筛选条件
            </button>
          </div>
        </div>

        <div v-if="totalPages > 1" class="mt-12 flex items-center justify-center gap-2">
          <button
            :disabled="page <= 1"
            class="w-10 h-10 rounded-xl flex items-center justify-center border border-surface-tertiary dark:border-zinc-700 text-content-tertiary dark:text-zinc-400 hover:border-brand-500 hover:text-brand-500 dark:hover:border-brand-500 dark:hover:text-brand-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-surface-tertiary disabled:hover:text-content-tertiary transition-all duration-200"
            @click="page--; fetchProjects(); scrollToTop()"
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
                  : 'text-content-tertiary dark:text-zinc-400 hover:bg-surface-secondary dark:hover:bg-zinc-800'"
                @click="page = p as number; fetchProjects(); scrollToTop()"
              >
                {{ p }}
              </button>
              <span v-else class="w-10 h-10 flex items-center justify-center text-content-quaternary">...</span>
            </template>
          </div>

          <button
            :disabled="page >= totalPages"
            class="w-10 h-10 rounded-xl flex items-center justify-center border border-surface-tertiary dark:border-zinc-700 text-content-tertiary dark:text-zinc-400 hover:border-brand-500 hover:text-brand-500 dark:hover:border-brand-500 dark:hover:text-brand-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-surface-tertiary disabled:hover:text-content-tertiary transition-all duration-200"
            @click="page++; fetchProjects(); scrollToTop()"
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
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton.vue';
import { projectApi, categoryApi } from '@/utils/api';
import type { ProjectListItem, Category } from '@/utils/api';

const projects = ref<ProjectListItem[]>([]);
const categories = ref<Category[]>([]);
const loading = ref(true);
const page = ref(1);
const totalPages = ref(1);
const categoryId = ref('');
const search = ref('');

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

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

function handleSearch() {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    page.value = 1;
    fetchProjects();
  }, 300);
}

function resetFilters() {
  search.value = '';
  categoryId.value = '';
  page.value = 1;
  fetchProjects();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
