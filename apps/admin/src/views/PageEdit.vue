<template>
  <div>
    <div class="flex items-center gap-4 mb-6">
      <RouterLink
        to="/pages"
        class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </RouterLink>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          编辑 {{ getPageTitle(slug) }}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ page?.status === 'published' ? '已发布' : '草稿' }}
        </p>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            页面标题
          </label>
          <input
            v-model="form.title"
            type="text"
            class="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入页面标题"
          />
        </div>

        <div class="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            页面内容 (支持 Markdown)
          </label>
          <textarea
            v-model="form.content"
            rows="20"
            class="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="使用 Markdown 格式编写内容..."
          />
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            支持 Markdown 语法：标题 (#)、粗体 (**)、斜体 (*)、链接、图片、代码块等
          </p>
        </div>

        <div class="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            封面图片 URL
          </label>
          <input
            v-model="form.heroImage"
            type="text"
            class="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
          <div v-if="form.heroImage" class="mt-3">
            <img :src="form.heroImage" alt="封面预览" class="w-full max-h-48 object-cover rounded-lg" />
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-6">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">SEO 设置</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Meta 标题</label>
              <input
                v-model="form.metaTitle"
                type="text"
                class="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-900 dark:text-white text-sm"
                placeholder="SEO 标题"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Meta 描述</label>
              <textarea
                v-model="form.metaDescription"
                rows="3"
                class="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-900 dark:text-white text-sm"
                placeholder="SEO 描述"
              />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-6">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">发布设置</h3>
          
          <div class="space-y-3">
            <button
              @click="saveDraft"
              :disabled="saving"
              class="w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-700 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-600 disabled:opacity-50 transition-colors"
            >
              {{ saving ? '保存中...' : '保存草稿' }}
            </button>
            
            <button
              @click="confirmPublish"
              :disabled="saving"
              class="w-full px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {{ saving ? '发布中...' : '发布内容' }}
            </button>

            <RouterLink
              :to="`/preview/${slug}`"
              target="_blank"
              class="w-full px-4 py-2.5 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 block text-center"
            >
              预览页面
            </RouterLink>
          </div>

          <div v-if="page?.publishedAt" class="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              发布时间: {{ formatDate(page.publishedAt) }}
            </p>
            <p v-if="page.publishedBy" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              发布者: {{ page.publishedBy }}
            </p>
          </div>
        </div>

        <div class="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-6">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">内容预览</h3>
          <div class="prose prose-sm dark:prose-invert max-h-96 overflow-y-auto">
            <div v-html="renderedContent" />
          </div>
        </div>
      </div>
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
          v-if="showConfirmDialog"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          @click="showConfirmDialog = false"
        >
          <div
            class="bg-white dark:bg-zinc-800 rounded-xl p-6 max-w-md w-full shadow-xl"
            @click.stop
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              确认发布
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              确定要发布此页面吗？发布后将在前台网站显示。
            </p>
            <div class="flex justify-end gap-3">
              <button
                @click="showConfirmDialog = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-700 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-600"
              >
                取消
              </button>
              <button
                @click="publish"
                :disabled="saving"
                class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {{ saving ? '发布中...' : '确认发布' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { marked } from 'marked';
import { pageApi } from '@/utils/api';

const route = useRoute();
const router = useRouter();
const slug = computed(() => route.params.slug as string);

const page = ref<any>(null);
const loading = ref(true);
const saving = ref(false);
const showConfirmDialog = ref(false);

const form = ref({
  title: '',
  content: '',
  metaTitle: '',
  metaDescription: '',
  heroImage: '',
});

const pageTitles: Record<string, string> = {
  home: '首页',
  about: '关于我',
  contact: '联系我们',
};

function getPageTitle(slug: string) {
  return pageTitles[slug] || slug;
}

const renderedContent = computed(() => {
  if (!form.value.content) return '<p class="text-gray-400">暂无内容</p>';
  return marked(form.value.content);
});

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

async function fetchPage() {
  loading.value = true;
  try {
    const { data } = await pageApi.getBySlug(slug.value);
    page.value = data;
    form.value = {
      title: data.title || '',
      content: data.content || '',
      metaTitle: data.metaTitle || '',
      metaDescription: data.metaDescription || '',
      heroImage: data.heroImage || '',
    };
  } catch (e) {
    console.error('Failed to fetch page:', e);
  } finally {
    loading.value = false;
  }
}

async function saveDraft() {
  saving.value = true;
  try {
    if (page.value) {
      await pageApi.update(page.value._id, {
        ...form.value,
        status: 'draft',
      });
    } else {
      await pageApi.create({
        slug: slug.value,
        ...form.value,
        status: 'draft',
      });
    }
    await fetchPage();
    alert('草稿已保存');
  } catch (e) {
    console.error('Failed to save draft:', e);
    alert('保存失败');
  } finally {
    saving.value = false;
  }
}

function confirmPublish() {
  showConfirmDialog.value = true;
}

async function publish() {
  saving.value = true;
  showConfirmDialog.value = false;
  try {
    if (page.value) {
      await pageApi.update(page.value._id, {
        ...form.value,
        status: 'published',
      });
    } else {
      await pageApi.create({
        slug: slug.value,
        ...form.value,
        status: 'published',
      });
    }
    await fetchPage();
    alert('页面已发布');
  } catch (e) {
    console.error('Failed to publish:', e);
    alert('发布失败');
  } finally {
    saving.value = false;
  }
}

onMounted(fetchPage);
</script>
