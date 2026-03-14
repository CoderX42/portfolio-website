<template>
  <div class="min-h-screen bg-surface-light dark:bg-zinc-950">
    <div class="container-app py-12">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-display font-bold text-content-primary dark:text-white mb-4">联系我</h1>
        <p class="text-lg text-content-tertiary dark:text-zinc-400 mb-8">有个项目想法或合作意向？我很乐意听到你的想法。</p>

        <div class="card p-8">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-content-secondary dark:text-zinc-300 mb-2">
                  姓名
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="input-field"
                  placeholder="你的名字"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-content-secondary dark:text-zinc-300 mb-2">
                  邮箱
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input-field"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-content-secondary dark:text-zinc-300 mb-2">
                主题（可选）
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                class="input-field"
                placeholder="关于什么？"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-content-secondary dark:text-zinc-300 mb-2">
                留言
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                required
                class="input-field resize-none"
                placeholder="告诉我更多关于你的项目或想法..."
              />
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="btn-primary w-full"
            >
              <span v-if="submitting" class="flex items-center justify-center gap-2">
                <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                发送中...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                发送消息
              </span>
            </button>

            <p v-if="submitSuccess" class="flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              消息已发送！我会尽快回复你。
            </p>

            <p v-if="submitError" class="flex items-center justify-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ submitError }}
            </p>
          </form>
        </div>

        <div class="mt-12 grid sm:grid-cols-3 gap-6">
          <div class="card p-6 text-center">
            <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
              <svg class="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="font-medium text-content-primary dark:text-white">邮箱</h3>
            <p class="mt-1 text-sm text-content-tertiary dark:text-zinc-400">hello@example.com</p>
          </div>

          <div class="card p-6 text-center">
            <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="font-medium text-content-primary dark:text-white">位置</h3>
            <p class="mt-1 text-sm text-content-tertiary dark:text-zinc-400">中国 · 远程工作</p>
          </div>

          <div class="card p-6 text-center">
            <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-pink-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-medium text-content-primary dark:text-white">响应时间</h3>
            <p class="mt-1 text-sm text-content-tertiary dark:text-zinc-400">24 小时内回复</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { contactApi } from '@/utils/api';

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});
const submitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref('');

async function handleSubmit() {
  submitting.value = true;
  submitSuccess.value = false;
  submitError.value = '';
  try {
    await contactApi.submit({
      name: form.name,
      email: form.email,
      message: form.subject ? `[${form.subject}] ${form.message}` : form.message,
    });
    submitSuccess.value = true;
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
  } catch {
    submitError.value = '发送失败，请稍后重试或直接发送邮件';
  } finally {
    submitting.value = false;
  }
}
</script>
