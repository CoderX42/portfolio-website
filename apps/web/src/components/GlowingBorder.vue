<template>
  <div>
    <div
      class="pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity"
      :class="{
        'opacity-100': glow,
        'border-white': variant === 'white',
        '!block': disabled
      }"
    />
    <div
      ref="containerRef"
      :style="{
        '--blur': `${blur}px`,
        '--spread': spread,
        '--start': '0',
        '--active': '0',
        '--glowingeffect-border-width': `${borderWidth}px`,
        '--repeating-conic-gradient-times': '5',
        '--gradient': variant === 'white' ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )` : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
                radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #dd7bbb 0%,
                  #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                  #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                  #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                  #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                )`
      }"
      class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity"
      :class="{
        'opacity-100': glow,
        'blur-[var(--blur)]': blur > 0,
        '!hidden': disabled
      }"
    >
      <div
        class="glow rounded-[inherit] after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, useCallback } from 'vue';
import { animate } from 'motion';

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: 'default' | 'white';
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const props = withDefaults(defineProps<GlowingEffectProps>(), {
  blur: 0,
  inactiveZone: 0.7,
  proximity: 0,
  spread: 20,
  variant: 'default',
  glow: false,
  className: '',
  disabled: true,
  movementDuration: 2,
  borderWidth: 1
});

const containerRef = ref<HTMLElement | null>(null);
const lastPosition = ref({ x: 0, y: 0 });
let animationFrameRef: number | null = null;

const handleMove = (e?: MouseEvent | { x: number; y: number }) => {
  if (!containerRef.value) return;

  if (animationFrameRef) {
    cancelAnimationFrame(animationFrameRef);
  }

  animationFrameRef = requestAnimationFrame(() => {
    const element = containerRef.value;
    if (!element) return;

    const { left, top, width, height } = element.getBoundingClientRect();
    const mouseX = e?.x ?? lastPosition.value.x;
    const mouseY = e?.y ?? lastPosition.value.y;

    if (e) {
      lastPosition.value = { x: mouseX, y: mouseY };
    }

    const center = [left + width * 0.5, top + height * 0.5];
    const distanceFromCenter = Math.hypot(
      mouseX - center[0],
      mouseY - center[1]
    );
    const inactiveRadius = 0.5 * Math.min(width, height) * props.inactiveZone;

    if (distanceFromCenter < inactiveRadius) {
      element.style.setProperty('--active', '0');
      return;
    }

    const isActive = 
      mouseX > left - props.proximity &&
      mouseX < left + width + props.proximity &&
      mouseY > top - props.proximity &&
      mouseY < top + height + props.proximity;

    element.style.setProperty('--active', isActive ? '1' : '0');

    if (!isActive) return;

    const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0;
    let targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

    const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
    const newAngle = currentAngle + angleDiff;

    animate(currentAngle, newAngle, {
      duration: props.movementDuration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        element.style.setProperty('--start', String(value));
      }
    });
  });
};

onMounted(() => {
  if (props.disabled) return;

  const handleScroll = () => handleMove();
  const handlePointerMove = (e: PointerEvent) => handleMove(e);

  window.addEventListener('scroll', handleScroll, { passive: true });
  document.body.addEventListener('pointermove', handlePointerMove, { passive: true });

  onUnmounted(() => {
    if (animationFrameRef) {
      cancelAnimationFrame(animationFrameRef);
    }
    window.removeEventListener('scroll', handleScroll);
    document.body.removeEventListener('pointermove', handlePointerMove);
  });
});
</script>

<style scoped>
:root {
  --black: #000000;
}
</style>