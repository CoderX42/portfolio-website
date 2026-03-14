<template>
  <div class="min-h-screen">
    <div v-if="loading" class="flex justify-center items-center min-h-[50vh]">
      <div class="w-8 h-8 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
    </div>

    <template v-else-if="project">
      <div class="container-apple py-12">
        <RouterLink
          to="/projects"
          class="inline-flex items-center gap-2 text-apple-gray hover:text-apple-blue transition-colors mb-8"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回作品列表
        </RouterLink>

        <article>
          <header class="mb-8">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-apple-black dark:text-white">
              {{ project.title }}
            </h1>
            <p class="mt-4 text-lg text-apple-gray">
              {{ project.description }}
            </p>
            <div v-if="project.tags?.length" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-3 py-1 rounded-full bg-apple-gray-light dark:bg-apple-gray-dark/30 text-sm text-apple-gray"
              >
                {{ tag }}
              </span>
            </div>
          </header>

          <div v-if="project.coverImage" class="mb-8 rounded-2xl overflow-hidden">
            <img
              :src="project.coverImage"
              :alt="project.title"
              class="w-full"
            />
          </div>

          <div v-if="project.media?.length" class="mb-8 space-y-4">
            <MediaViewer :media="project.media" />
          </div>

          <div
            v-if="project.content"
            class="prose prose-lg max-w-none dark:prose-invert"
            v-html="renderedContent"
          />

          <div v-if="project.codeSnippets?.length" class="mt-8 space-y-4">
            <h2 class="text-2xl font-bold text-apple-black dark:text-white">代码示例</h2>
            <CodeSnippet
              v-for="(snippet, index) in project.codeSnippets"
              :key="index"
              :snippet="snippet"
            />
          </div>
        </article>
      </div>
    </template>

    <div v-else class="container-apple py-24 text-center">
      <p class="text-apple-gray text-lg">作品不存在</p>
      <RouterLink to="/projects" class="btn-apple mt-6">
        返回作品列表
      </RouterLink>
    </div>
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
