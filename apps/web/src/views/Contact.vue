<template>
  <div class="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">联系方式</h1>
    <p class="mt-2 text-gray-600 dark:text-gray-300">欢迎与我取得联系</p>

    <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">姓名</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">邮箱</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">留言</label>
        <textarea
          id="message"
          v-model="form.message"
          rows="5"
          required
          class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <button
        type="submit"
        :disabled="submitting"
        class="w-full rounded-lg bg-primary-600 px-4 py-3 font-medium text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {{ submitting ? '提交中...' : '提交' }}
      </button>
      <p v-if="submitSuccess" class="text-center text-green-600 dark:text-green-400">提交成功，感谢您的留言！</p>
      <p v-if="submitError" class="text-center text-red-600 dark:text-red-400">{{ submitError }}</p>
    </form>
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
    submitError.value = '提交失败，请稍后重试';
  } finally {
    submitting.value = false;
  }
}
</script>
