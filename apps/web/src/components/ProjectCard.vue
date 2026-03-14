<template>
  <RouterLink
    :to="`/projects/${project.slug}`"
    class="group block"
  >
    <article class="relative overflow-hidden rounded-2xl bg-apple-gray-light dark:bg-apple-gray-dark/30 transition-all duration-400 hover:shadow-xl">
      <div class="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img
          v-if="project.coverImage"
          :src="project.coverImage"
          :alt="project.title"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
          loading="lazy"
        />
        <div
          v-else
          class="h-full w-full flex items-center justify-center"
        >
          <span class="text-5xl font-bold text-gray-300 dark:text-gray-600">{{ project.title.charAt(0) }}</span>
        </div>
      </div>

      <div class="p-5">
        <h3 class="font-semibold text-lg text-apple-black dark:text-white group-hover:text-apple-blue transition-colors duration-200 line-clamp-1">
          {{ project.title }}
        </h3>
        <p class="mt-2 text-sm text-apple-gray line-clamp-2">
          {{ project.description }}
        </p>

        <div v-if="project.tags?.length" class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags.slice(0, 2)"
            :key="tag"
            class="text-xs text-apple-gray"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<script setup lang="ts">
import type { ProjectListItem } from '@/utils/api';

defineProps<{ project: ProjectListItem }>();
</script>
