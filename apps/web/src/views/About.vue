<template>
  <div class="min-h-screen">
    <div class="bg-apple-gray-light dark:bg-apple-gray-dark/30 py-16">
      <div class="container-apple">
        <h1 class="text-4xl sm:text-5xl font-bold text-apple-black dark:text-white">
          关于我
        </h1>
      </div>
    </div>

    <div class="container-apple py-16">
      <div class="max-w-3xl mx-auto">
        <div class="space-y-8">
          <div class="animate-fade-in-up">
            <h2 class="text-2xl font-bold text-apple-black dark:text-white mb-4">
              开发者 & 创造者
            </h2>
            <p class="text-apple-gray leading-relaxed text-lg">
              热衷于探索 AI 辅助编程的可能性，专注于构建高质量的 Web 应用。我相信技术应该服务于创意，而不仅仅是工具。
            </p>
          </div>

          <div class="animate-fade-in-up" style="animation-delay: 100ms;">
            <h2 class="text-2xl font-bold text-apple-black dark:text-white mb-4">
              技术栈
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in technologies"
                :key="tech"
                class="px-3 py-1.5 rounded-full bg-apple-gray-light dark:bg-apple-gray-dark/30 text-sm text-apple-gray"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="animate-fade-in-up" style="animation-delay: 200ms;">
            <h2 class="text-2xl font-bold text-apple-black dark:text-white mb-4">
              联系我
            </h2>
            <p class="text-apple-gray leading-relaxed text-lg mb-6">
              我总是对新的项目和合作机会持开放态度。如果你有有趣的想法或想要合作，欢迎随时联系我。
            </p>
            <RouterLink to="/contact" class="btn-apple">
              发送消息
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const technologies = [
  'JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js',
  'Python', 'Go', 'PostgreSQL', 'MongoDB', 'Docker',
  'AWS', 'GraphQL', 'Tailwind CSS', 'Git', 'AI/ML'
];
</script>
