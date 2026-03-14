<template>
  <div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute"
        :class="shapes[0].className"
        :style="{ animationDelay: `${shapes[0].delay}s` }"
      >
        <div
          class="relative"
          :style="{ width: `${shapes[0].width}px`, height: `${shapes[0].height}px` }"
        >
          <div
            class="absolute inset-0 rounded-full"
            :class="[
              'bg-gradient-to-r to-transparent',
              shapes[0].gradient,
              'backdrop-blur-[2px] border-2 border-white/[0.15]',
              'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
              'after:absolute after:inset-0 after:rounded-full',
              'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
            ]"
            :style="{ transform: `rotate(${shapes[0].rotate}deg)` }"
          />
        </div>
      </div>

      <div
        class="absolute"
        :class="shapes[1].className"
        :style="{ animationDelay: `${shapes[1].delay}s` }"
      >
        <div
          class="relative"
          :style="{ width: `${shapes[1].width}px`, height: `${shapes[1].height}px` }"
        >
          <div
            class="absolute inset-0 rounded-full"
            :class="[
              'bg-gradient-to-r to-transparent',
              shapes[1].gradient,
              'backdrop-blur-[2px] border-2 border-white/[0.15]',
              'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
              'after:absolute after:inset-0 after:rounded-full',
              'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
            ]"
            :style="{ transform: `rotate(${shapes[1].rotate}deg)` }"
          />
        </div>
      </div>

      <div
        class="absolute"
        :class="shapes[2].className"
        :style="{ animationDelay: `${shapes[2].delay}s` }"
      >
        <div
          class="relative"
          :style="{ width: `${shapes[2].width}px`, height: `${shapes[2].height}px` }"
        >
          <div
            class="absolute inset-0 rounded-full"
            :class="[
              'bg-gradient-to-r to-transparent',
              shapes[2].gradient,
              'backdrop-blur-[2px] border-2 border-white/[0.15]',
              'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
              'after:absolute after:inset-0 after:rounded-full',
              'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
            ]"
            :style="{ transform: `rotate(${shapes[2].rotate}deg)` }"
          />
        </div>
      </div>

      <div
        class="absolute"
        :class="shapes[3].className"
        :style="{ animationDelay: `${shapes[3].delay}s` }"
      >
        <div
          class="relative"
          :style="{ width: `${shapes[3].width}px`, height: `${shapes[3].height}px` }"
        >
          <div
            class="absolute inset-0 rounded-full"
            :class="[
              'bg-gradient-to-r to-transparent',
              shapes[3].gradient,
              'backdrop-blur-[2px] border-2 border-white/[0.15]',
              'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
              'after:absolute after:inset-0 after:rounded-full',
              'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
            ]"
            :style="{ transform: `rotate(${shapes[3].rotate}deg)` }"
          />
        </div>
      </div>

      <div
        class="absolute"
        :class="shapes[4].className"
        :style="{ animationDelay: `${shapes[4].delay}s` }"
      >
        <div
          class="relative"
          :style="{ width: `${shapes[4].width}px`, height: `${shapes[4].height}px` }"
        >
          <div
            class="absolute inset-0 rounded-full"
            :class="[
              'bg-gradient-to-r to-transparent',
              shapes[4].gradient,
              'backdrop-blur-[2px] border-2 border-white/[0.15]',
              'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
              'after:absolute after:inset-0 after:rounded-full',
              'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
            ]"
            :style="{ transform: `rotate(${shapes[4].rotate}deg)` }"
          />
        </div>
      </div>
    </div>

    <div class="relative z-10 container mx-auto px-4 md:px-6">
      <div class="max-w-3xl mx-auto text-center">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12 animate-fade-in"
        >
          <span class="w-2 h-2 rounded-full bg-rose-500/80 animate-pulse" />
          <span class="text-sm text-white/60 tracking-wide">
            {{ badge }}
          </span>
        </div>

        <h1 class="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight animate-fade-in-up">
          <span class="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
            {{ title1 }}
          </span>
          <br />
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            {{ title2 }}
          </span>
        </h1>

        <p class="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4 animate-fade-in-up animation-delay-200">
          {{ description }}
        </p>
      </div>
    </div>

    <div class="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  badge: 'Vibe Coding 作品集',
  title1: '用代码构建',
  title2: '创意未来',
  description: '探索 AI 辅助编程的创意与实践，分享前沿技术项目',
});

const shapes = [
  {
    delay: 0.3,
    width: 600,
    height: 140,
    rotate: 12,
    gradient: 'from-indigo-500/[0.15]',
    className: 'left-[-10%] md:left-[-5%] top-[15%] md:top-[20%] animate-float-slow',
  },
  {
    delay: 0.5,
    width: 500,
    height: 120,
    rotate: -15,
    gradient: 'from-rose-500/[0.15]',
    className: 'right-[-5%] md:right-[0%] top-[70%] md:top-[75%] animate-float-medium',
  },
  {
    delay: 0.4,
    width: 300,
    height: 80,
    rotate: -8,
    gradient: 'from-violet-500/[0.15]',
    className: 'left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%] animate-float-fast',
  },
  {
    delay: 0.6,
    width: 200,
    height: 60,
    rotate: 20,
    gradient: 'from-amber-500/[0.15]',
    className: 'right-[15%] md:right-[20%] top-[10%] md:top-[15%] animate-float-slow',
  },
  {
    delay: 0.7,
    width: 150,
    height: 40,
    rotate: -25,
    gradient: 'from-cyan-500/[0.15]',
    className: 'left-[20%] md:left-[25%] top-[5%] md:top-[10%] animate-float-medium',
  },
];
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
}

.animate-float-slow {
  animation: float 12s ease-in-out infinite;
}

.animate-float-medium {
  animation: float 10s ease-in-out infinite;
}

.animate-float-fast {
  animation: float 8s ease-in-out infinite;
}
</style>
