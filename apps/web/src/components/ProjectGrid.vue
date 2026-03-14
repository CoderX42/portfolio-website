<template>
  <div
    class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    role="list"
  >
    <ProjectCard v-for="project in projects" :key="project._id" :project="project" />
  </div>
</template>

<script setup lang="ts">
import ProjectCard from './ProjectCard.vue';
import type { ProjectListItem } from '@/utils/api';

defineProps<{ projects: ProjectListItem[] }>();
</script>
