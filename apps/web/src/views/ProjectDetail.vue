<template>
  <div class="relative min-h-screen">
    <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 dark:opacity-15 pointer-events-none" />

    <div class="relative section-container py-12 lg:py-16">
      <div v-if="loading" class="flex justify-center py-24">
        <div class="relative">
          <div class="w-12 h-12 border-4 border-brand-200 dark:border-brand-800 rounded-full animate-spin" />
          <div class="absolute inset-0 w-12 h-12 border-4 border-brand-500 rounded-full animate-spin border-t-transparent" />
        </div>
      </div>

      <template v-else-if="project">
        <RouterLink
          to="/projects"
          class="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 mb-8 group"
        >
          <svg class="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回作品列表
        </RouterLink>

        <article class="max-w-4xl mx-auto">
          <header class="mb-12">
            <h1 class="text-4xl sm:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-6 animate-slide-up">
              {{ project.title }}
            </h1>

            <div v-if="project.tags?.length" class="flex flex-wrap gap-2 mb-6 animate-slide-up-delay-1">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
              >
                {{ tag }}
              </span>
            </div>

            <p class="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed animate-slide-up-delay-2">
              {{ project.description }}
            </p>
          </header>

          <div v-if="project.coverImage" class="mb-12 rounded-2xl overflow-hidden shadow-xl animate-slide-up-delay-2">
            <img
              :src="project.coverImage"
              :alt="project.title"
              class="w-full object-cover"
            />
          </div>

          <div v-if="project.media?.length" class="mb-12 space-y-6 animate-slide-up-delay-3">
            <MediaViewer :media="project.media" />
          </div>

          <div
            v-if="project.content"
            class="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-img:rounded-xl animate-slide-up-delay-3"
            v-html="renderedContent"
          />

          <div v-if="project.codeSnippets?.length" class="mt-12 space-y-6 animate-slide-up-delay-4">
            <h2 class="text-2xl font-display font-semibold text-zinc-900 dark:text-white">代码示例</h2>
            <CodeSnippet
              v-for="(snippet, index) in project.codeSnippets"
              :key="index"
              :snippet="snippet"
            />
          </div>

          <div class="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 animate-slide-up-delay-4">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
              <RouterLink
                to="/projects"
                class="btn-secondary"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                查看更多作品
              </RouterLink>

              <div class="flex items-center gap-4">
                <span class="text-sm text-zinc-500 dark:text-zinc-400">分享到</span>
                <div class="flex gap-2">
                  <button
                    class="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200"
                    @click="shareToTwitter"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button
                    class="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200"
                    @click="copyLink"
                  >
                    <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <svg v-else class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </template>

      <div v-else class="py-24 text-center">
        <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <svg class="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-xl font-medium text-zinc-900 dark:text-white mb-2">作品不存在</p>
        <p class="text-zinc-500 dark:text-zinc-400 mb-8">抱歉，您访问的作品不存在或已被删除</p>
        <RouterLink to="/projects" class="btn-primary">
          返回作品列表
        </RouterLink>
      </div>
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
const copied = ref(false);

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

function shareToTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Check out this project: ${project.value?.title}`);
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    // ignore
  }
}

onMounted(fetchProject);
watch(() => route.params.slug, fetchProject);
</script>
