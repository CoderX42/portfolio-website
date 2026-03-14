<template>
  <RouterLink
    :to="`/projects/${project.slug}`"
    class="group block"
  >
    <div class="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
      <GlowingBorder
        spread="40"
        :glow="true"
        :disabled="false"
        proximity="64"
        inactiveZone="0.01"
        borderWidth="3"
      />
      <div class="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
        <div class="relative aspect-video overflow-hidden bg-gradient-to-br from-surface-secondary to-surface-tertiary dark:from-zinc-800 dark:to-zinc-900">
          <img
            v-if="project.coverImage"
            :src="project.coverImage"
            :alt="project.title"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            v-else
            class="absolute inset-0 flex items-center justify-center"
          >
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500/20 to-cyan-400/20 flex items-center justify-center">
              <span class="text-4xl font-display font-bold text-brand-500/40">{{ project.title.charAt(0) }}</span>
            </div>
          </div>

          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div class="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-xs font-medium text-content-primary dark:text-white">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              查看详情
            </span>
          </div>

          <div class="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg class="w-4 h-4 text-content-secondary dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        <div>
          <h3 class="font-display font-semibold text-lg text-content-primary dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200 line-clamp-1">
            {{ project.title }}
          </h3>
          <p class="mt-2 text-sm text-content-tertiary dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {{ project.description }}
          </p>

          <div v-if="project.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags.slice(0, 3)"
              :key="tag"
              class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-secondary dark:bg-zinc-800 text-content-tertiary dark:text-zinc-400"
            >
              {{ tag }}
            </span>
            <span
              v-if="project.tags.length > 3"
              class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
            >
              +{{ project.tags.length - 3 }}
            </span>
          </div>

          <div class="mt-4 pt-4 border-t border-surface-tertiary dark:border-zinc-800 flex items-center justify-between text-xs text-content-quaternary dark:text-zinc-500">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(project.createdAt) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import GlowingBorder from './GlowingBorder.vue';
import type { ProjectListItem } from '@/utils/api';

defineProps<{ project: ProjectListItem }>();

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
</script>
