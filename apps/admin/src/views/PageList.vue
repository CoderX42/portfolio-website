<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">页面管理</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">管理首页、关于页面和联系页面的内容</p>
      </div>
      <button
        @click="seedPages"
        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700"
      >
        初始化页面
      </button>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="page in pages"
        :key="page._id"
        class="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ getPageTitle(page.slug) }}
              </h3>
              <span
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium',
                  page.status === 'published'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                ]"
              >
                {{ page.status === 'published' ? '已发布' : '草稿' }}
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
              路径: <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-700 rounded text-xs">/{{ page.slug }}</code>
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {{ page.metaDescription || '暂无描述' }}
            </p>
            <div class="flex items-center gap-4 mt-3 text-xs text-gray-400 dark:text-gray-500">
              <span>更新于: {{ formatDate(page.updatedAt) }}</span>
              <span v-if="page.publishedAt">发布于: {{ formatDate(page.publishedAt) }}</span>
              <span v-if="page.publishedBy">发布者: {{ page.publishedBy }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 ml-4">
            <RouterLink
              :to="`/pages/edit/${page.slug}`"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              编辑
            </RouterLink>
            <button
              v-if="page.status === 'draft'"
              @click="publishPage(page._id)"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              发布
            </button>
            <button
              v-else
              @click="unpublishPage(page._id)"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-700 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
            >
              取消发布
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && pages.length === 0" class="text-center py-12">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p class="text-gray-500 dark:text-gray-400 mb-4">暂无页面数据</p>
      <button
        @click="seedPages"
        class="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        点击初始化页面
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { pageApi } from '@/utils/api';

const pages = ref<any[]>([]);
const loading = ref(true);

const pageTitles: Record<string, string> = {
  home: '首页',
  about: '关于我',
  contact: '联系我们',
};

function getPageTitle(slug: string) {
  return pageTitles[slug] || slug;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

async function fetchPages() {
  loading.value = true;
  try {
    const { data } = await pageApi.getAll();
    pages.value = data;
  } catch (e) {
    console.error('Failed to fetch pages:', e);
  } finally {
    loading.value = false;
  }
}

async function seedPages() {
  try {
    await pageApi.seed();
    await fetchPages();
  } catch (e) {
    console.error('Failed to seed pages:', e);
  }
}

async function publishPage(id: string) {
  try {
    await pageApi.publish(id);
    await fetchPages();
  } catch (e) {
    console.error('Failed to publish page:', e);
  }
}

async function unpublishPage(id: string) {
  try {
    await pageApi.unpublish(id);
    await fetchPages();
  } catch (e) {
    console.error('Failed to unpublish page:', e);
  }
}

onMounted(fetchPages);
</script>
