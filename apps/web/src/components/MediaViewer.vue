<template>
  <div class="space-y-4">
    <template v-for="(item, i) in media" :key="i">
      <figure v-if="item.type === 'image'" class="overflow-hidden rounded-2xl">
        <img
          :src="item.url"
          :alt="item.alt || ''"
          class="w-full object-contain"
          loading="lazy"
        />
        <figcaption v-if="item.caption" class="mt-2 text-center text-sm text-[var(--color-text-secondary)]">
          {{ item.caption }}
        </figcaption>
      </figure>
      <figure v-else-if="item.type === 'video'" class="overflow-hidden rounded-2xl">
        <video :src="item.url" controls class="w-full" />
        <figcaption v-if="item.caption" class="mt-2 text-center text-sm text-[var(--color-text-secondary)]">
          {{ item.caption }}
        </figcaption>
      </figure>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  media: { type: 'image' | 'video'; url: string; alt?: string; caption?: string }[];
}>();
</script>
