<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <div v-if="loading" class="flex justify-center py-24">
      <div class="h-10 w-10 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
    </div>
    <template v-else-if="project">
      <RouterLink to="/projects" class="mb-6 inline-block text-primary-600 hover:underline dark:text-primary-400">
        ← 返回列表
      </RouterLink>
      <article>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ project.title }}</h1>
        <div v-if="project.tags?.length" class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
          >
            {{ tag }}
          </span>
        </div>
        <div v-if="project.coverImage" class="mt-6 overflow-hidden rounded-xl">
          <img
            :src="project.coverImage"
            :alt="project.title"
            class="w-full object-cover"
          />
        </div>
        <div v-if="project.media?.length" class="mt-8">
          <MediaViewer :media="project.media" />
        </div>
        <div v-if="project.content" class="prose mt-8 max-w-none dark:prose-invert" v-html="renderedContent" />
        <div v-if="project.codeSnippets?.length" class="mt-8 space-y-4">
          <CodeSnippet v-for="(s, i) in project.codeSnippets" :key="i" :snippet="s" />
        </div>
      </article>
    </template>
    <div v-else class="py-24 text-center text-gray-500">作品不存在</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useHead } from '@unhead/vue';
import { marked } from 'marked';
import MediaViewer from '@/components/MediaViewer.vue';
import CodeSnippet from '@/components/CodeSnippet.vue';
import { projectApi } from '@/utils/api';
import type { ProjectDetail } from '@/utils/api';

const route = useRoute();
const project = ref<ProjectDetail | null>(null);
const loading = ref(true);

const renderedContent = computed(() =>
  project.value?.content ? marked(project.value.content, { gfm: true }) : ''
);

useHead({
  title: () => project.value?.title ? `${project.value.title} - 作品集` : '作品详情',
  meta: [
    {
      name: 'description',
      content: () => project.value?.description || 'Vibe Coding 作品详情',
    },
  ],
});

async function fetchProject() {
  const slug = route.params.slug as string;
  if (!slug) return;
  loading.value = true;
  try {
    const { data } = await projectApi.getBySlug(slug);
    project.value = data;
  } catch {
    project.value = null;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProject);
watch(() => route.params.slug, fetchProject);
</script>
