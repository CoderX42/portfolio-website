<template>
  <div
    class="fixed bottom-6 sm:top-6 left-1/2 -translate-x-1/2 z-50"
    :class="{ 'sm:top-6': !isScrolled, 'sm:top-4': isScrolled }"
  >
    <div class="flex items-center gap-1 sm:gap-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-surface-tertiary dark:border-zinc-700/50 py-1.5 px-2 rounded-full shadow-lg shadow-black/5 dark:shadow-black/20">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200"
        :class="[
          isActive(item.path)
            ? 'text-brand-600 dark:text-brand-400'
            : 'text-content-secondary dark:text-zinc-400 hover:text-content-primary dark:hover:text-white'
        ]"
        @click="setActive(item.path)"
      >
        <span class="hidden md:inline">{{ item.label }}</span>
        <component :is="item.icon" class="md:hidden w-5 h-5" stroke-width="2.5" />
        
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isActive(item.path)"
            class="absolute inset-0 bg-brand-100 dark:bg-brand-500/10 rounded-full -z-10"
          >
            <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-brand-500 rounded-t-full">
              <div class="absolute w-8 h-4 bg-brand-400/30 rounded-full blur-md -top-1 -left-1" />
              <div class="absolute w-6 h-4 bg-brand-400/30 rounded-full blur-md -top-0.5" />
              <div class="absolute w-3 h-3 bg-brand-400/30 rounded-full blur-sm top-0 left-1.5" />
            </div>
          </div>
        </Transition>
      </RouterLink>
    </div>
  </div>

  <div
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none"
    :class="isScrolled ? 'bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md border-b border-surface-tertiary/50 dark:border-white/5' : ''"
  >
    <div class="container-app h-16 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2 pointer-events-auto">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-md shadow-brand-500/20">
          <span class="text-white font-bold text-sm">V</span>
        </div>
        <span class="font-display font-semibold text-sm text-content-primary dark:text-white hidden sm:block">
          {{ siteName }}
        </span>
      </RouterLink>
      
      <ThemeToggle />
    </div>
  </div>

  <div class="h-16 sm:h-20" />

  <div
    class="progress-bar"
    :style="{ width: `${scrollProgress}%` }"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

const siteName = import.meta.env.VITE_SITE_NAME || 'Vibe Coding';
const route = useRoute();
const isScrolled = ref(false);
const scrollProgress = ref(0);
const activeTab = ref('首页');

const HomeIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
  ])
};

const BriefcaseIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
  ])
};

const UserIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
  ])
};

const MailIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
  ])
};

const navItems = [
  { path: '/', label: '首页', icon: HomeIcon },
  { path: '/projects', label: '作品', icon: BriefcaseIcon },
  { path: '/about', label: '关于', icon: UserIcon },
  { path: '/contact', label: '联系', icon: MailIcon },
];

function isActive(path: string) {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(path);
}

function setActive(path: string) {
  activeTab.value = navItems.find(item => item.path === path)?.label || '';
}

watch(() => route.path, (newPath) => {
  const item = navItems.find(item => item.path === newPath || (newPath.startsWith(item.path) && item.path !== '/'));
  if (item) {
    activeTab.value = item.label;
  }
}, { immediate: true });

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
  
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollTop = window.scrollY;
  scrollProgress.value = (scrollTop / documentHeight) * 100;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.progress-bar {
  @apply fixed top-0 left-0 h-0.5 bg-gradient-to-r from-brand-500 to-cyan-400 z-50 transition-all duration-150 ease-out;
}
</style>
