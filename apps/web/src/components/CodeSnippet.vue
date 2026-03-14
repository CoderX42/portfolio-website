<template>
  <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
    <div
      class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
    >
      <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
        {{ snippet.filename || snippet.language }}
      </span>
    </div>
    <pre class="overflow-x-auto bg-gray-900 p-4 text-sm text-gray-100"><code>{{ snippet.code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  snippet: { language: string; code: string; filename?: string };
}>();
</script>
