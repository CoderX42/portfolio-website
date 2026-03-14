<template>
  <div class="overflow-hidden rounded-xl border border-[var(--color-border)]">
    <div class="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2">
      <span class="text-sm text-[var(--color-text-secondary)]">
        {{ snippet.filename || snippet.language }}
      </span>
    </div>
    <pre class="overflow-x-auto bg-zinc-900 p-4 text-sm text-zinc-100 font-mono"><code>{{ snippet.code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  snippet: { language: string; code: string; filename?: string };
}>();
</script>
