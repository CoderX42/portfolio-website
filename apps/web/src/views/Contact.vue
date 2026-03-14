<template>
  <div class="min-h-screen">
    <div class="bg-apple-gray-light dark:bg-apple-gray-dark/30 py-16">
      <div class="container-apple">
        <h1 class="text-4xl sm:text-5xl font-bold text-apple-black dark:text-white">
          联系我
        </h1>
        <p class="mt-4 text-apple-gray text-lg">
          有个项目想法？我很乐意听到你的想法。
        </p>
      </div>
    </div>

    <div class="container-apple py-12">
      <div class="max-w-xl mx-auto">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="name" class="block text-sm font-medium text-apple-black dark:text-white mb-2">
              姓名
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-apple-black text-apple-black dark:text-white placeholder:text-apple-gray focus:outline-none focus:border-apple-blue transition-colors"
              placeholder="你的名字"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-apple-black dark:text-white mb-2">
              邮箱
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-apple-black text-apple-black dark:text-white placeholder:text-apple-gray focus:outline-none focus:border-apple-blue transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-apple-black dark:text-white mb-2">
              留言
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-apple-black text-apple-black dark:text-white placeholder:text-apple-gray focus:outline-none focus:border-apple-blue transition-colors resize-none"
              placeholder="告诉我你的项目或想法..."
            />
          </div>
          <button
            type="submit"
            :disabled="submitting"
            class="btn-apple w-full"
          >
            {{ submitting ? '发送中...' : '发送消息' }}
          </button>
          <p v-if="submitSuccess" class="text-center text-green-600">
            消息已发送！我会尽快回复你。
          </p>
          <p v-if="submitError" class="text-center text-red-600">
            {{ submitError }}
          </p>
        </form>
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
    await contactApi.submit(form);
    submitSuccess.value = true;
    form.name = '';
    form.email = '';
    form.message = '';
  } catch {
    submitError.value = '发送失败，请稍后重试';
  } finally {
    submitting.value = false;
  }
}
</script>
