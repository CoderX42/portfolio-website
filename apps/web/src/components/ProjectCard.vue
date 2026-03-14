<template>
  <RouterLink
    :to="`/projects/${project.slug}`"
    class="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
      <img
        v-if="project.coverImage"
        :src="project.coverImage"
        :alt="project.title"
        class="h-full w-full object-cover transition group-hover:scale-105"
        loading="lazy"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center text-4xl text-gray-400 dark:text-gray-500"
      >
        {{ project.title.charAt(0) }}
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
      <p class="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
        {{ project.description }}
      </p>
      <div v-if="project.tags?.length" class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags.slice(0, 3)"
          :key="tag"
          class="rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { ProjectListItem } from '@/utils/api';

defineProps<{ project: ProjectListItem }>();
</script>
