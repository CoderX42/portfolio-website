<template>
  <div class="min-h-screen bg-surface-light dark:bg-zinc-950">
    <div v-if="loading" class="flex justify-center items-center min-h-[50vh]">
      <div class="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <template v-else-if="project">
      <div class="container-app py-8 sm:py-12">
        <RouterLink
          to="/projects"
          class="inline-flex items-center gap-2 text-content-tertiary dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-6 group"
        >
          <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回作品列表
        </RouterLink>

        <article class="max-w-4xl">
          <header class="mb-8">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-content-primary dark:text-white mb-4">
              {{ project.title }}
            </h1>
            <p class="text-lg text-content-tertiary dark:text-zinc-400 mb-6">
              {{ project.description }}
            </p>
            <div v-if="project.tags?.length" class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-3 py-1.5 rounded-full text-sm font-medium bg-surface-secondary dark:bg-zinc-800 text-content-secondary dark:text-zinc-300"
              >
                {{ tag }}
              </span>
            </div>
            <div class="flex items-center gap-4 text-sm text-content-quaternary dark:text-zinc-500">
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(project.createdAt) }}
              </span>
              <span v-if="project.categoryIds?.[0]" class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {{ getCategoryName(project.categoryIds[0]) }}
            </span>
            </div>
          </header>

          <div v-if="project.coverImage" class="mb-8">
            <button
              class="relative w-full rounded-2xl overflow-hidden group cursor-zoom-in"
              @click="openImageViewer(project.coverImage)"
            >
              <img
                :src="project.coverImage"
                :alt="project.title"
                class="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div class="w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-800/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <svg class="w-6 h-6 text-content-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <div v-if="project.media?.length" class="mb-8 space-y-4">
            <MediaViewer :media="project.media" @view="openImageViewer" />
          </div>

          <div
            v-if="project.content"
            class="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-img:rounded-xl"
            v-html="renderedContent"
          />

          <div v-if="project.codeSnippets?.length" class="mt-12 space-y-6">
            <h2 class="text-2xl font-display font-semibold text-content-primary dark:text-white">代码示例</h2>
            <CodeSnippet
              v-for="(snippet, index) in project.codeSnippets"
              :key="index"
              :snippet="snippet"
            />
          </div>

          <div class="mt-12 pt-8 border-t border-surface-tertiary dark:border-zinc-800">
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

              <div class="flex items-center gap-3">
                <span class="text-sm text-content-quaternary dark:text-zinc-500">分享到</span>
                <div class="flex gap-2">
                  <button
                    class="w-10 h-10 rounded-xl bg-surface-secondary dark:bg-zinc-800 flex items-center justify-center text-content-tertiary dark:text-zinc-400 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200"
                    @click="shareToTwitter"
                    aria-label="分享到 Twitter"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button
                    class="w-10 h-10 rounded-xl bg-surface-secondary dark:bg-zinc-800 flex items-center justify-center text-content-tertiary dark:text-zinc-400 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200"
                    @click="copyLink"
                    aria-label="复制链接"
                  >
                    <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <svg v-else class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section v-if="relatedProjects.length" class="mt-16">
          <h2 class="text-2xl font-display font-semibold text-content-primary dark:text-white mb-6">
            相关作品
          </h2>
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              v-for="related in relatedProjects"
              :key="related._id"
              :project="related"
            />
          </div>
        </section>
      </div>
    </template>

    <div v-else class="container-app py-24 text-center">
      <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-secondary dark:bg-zinc-800 flex items-center justify-center">
        <svg class="w-10 h-10 text-content-quaternary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-xl font-medium text-content-primary dark:text-white mb-2">作品不存在</p>
      <p class="text-content-tertiary dark:text-zinc-400 mb-8">抱歉，您访问的作品不存在或已被删除</p>
      <RouterLink to="/projects" class="btn-primary">
        返回作品列表
      </RouterLink>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="imageViewerOpen"
          class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          @click="closeImageViewer"
        >
          <button
            class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            @click="closeImageViewer"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            :src="currentImage"
            :alt="project?.title"
            class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            @click.stop
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useHead } from '@unhead/vue';
import { marked } from 'marked';
import MediaViewer from '@/components/MediaViewer.vue';
import CodeSnippet from '@/components/CodeSnippet.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { projectApi, categoryApi } from '@/utils/api';
import type { ProjectDetail, ProjectListItem, Category } from '@/utils/api';

const route = useRoute();
const project = ref<ProjectDetail | null>(null);
const relatedProjects = ref<ProjectListItem[]>([]);
const categories = ref<Category[]>([]);
const loading = ref(true);
const copied = ref(false);
const imageViewerOpen = ref(false);
const currentImage = ref('');

const renderedContent = computed(() =>
  project.value?.content ? marked(project.value.content, { gfm: true }) : ''
);

useHead({
  title: () => project.value?.title ? `${project.value.title} - Vibe Coding` : '作品详情',
  meta: [
    {
      name: 'description',
      content: () => project.value?.description || 'Vibe Coding 作品详情',
    },
    {
      property: 'og:title',
      content: () => project.value?.title ? `${project.value.title} - Vibe Coding` : '作品详情',
    },
    {
      property: 'og:description',
      content: () => project.value?.description || 'Vibe Coding 作品详情',
    },
    {
      property: 'og:image',
      content: () => project.value?.coverImage || '',
    },
    {
      property: 'og:type',
      content: 'article',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
});

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getCategoryName(categoryId: string) {
  const category = categories.value.find(c => c._id === categoryId);
  return category?.name || '';
}

function openImageViewer(src: string) {
  currentImage.value = src;
  imageViewerOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function closeImageViewer() {
  imageViewerOpen.value = false;
  document.body.style.overflow = '';
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

async function fetchProject() {
  const slug = route.params.slug as string;
  if (!slug) return;
  loading.value = true;
  try {
    const [projectRes, categoriesRes] = await Promise.all([
      projectApi.getBySlug(slug),
      categoryApi.getAll()
    ]);
    
    project.value = projectRes.data;
    categories.value = categoriesRes.data;
    
    if (project.value) {
      const tag = project.value.tags?.[0] || '';
      const categoryId = project.value.categoryIds?.[0];
      
      const relatedRes = await projectApi.getList({
        limit: 6,
        ...(tag ? { search: tag } : {}),
        ...(categoryId ? { categoryId } : {})
      });
      
      relatedProjects.value = relatedRes.data.items
        .filter(p => p._id !== project.value?._id)
        .slice(0, 3);
    }
  } catch {
    project.value = null;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProject);
watch(() => route.params.slug, fetchProject);
</script>
