<template>
  <div
    class="h-screen flex flex-col items-center justify-center relative overflow-hidden"
    :class="containerClassName"
  >
    <canvas
      ref="canvasRef"
      class="absolute inset-0 z-0"
      :style="canvasStyle"
    />
    <div class="relative z-10" :class="className">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Props {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: 'slow' | 'fast';
  waveOpacity?: number;
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  containerClassName: '',
  colors: () => ['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee'],
  waveWidth: 50,
  backgroundFill: 'black',
  blur: 10,
  speed: 'fast',
  waveOpacity: 0.5,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isSafari = ref(false);

const canvasStyle = computed(() => {
  if (isSafari.value) {
    return { filter: `blur(${props.blur}px)` };
  }
  return {};
});

function createNoise3D() {
  const noise = (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    
    const p = [2091639, 1852521, 18014198, 2451942, 2453066];
    
    const A = p[X & 255] + Y;
    const AA = p[A & 255] + Z;
    const AB = p[(A + 1) & 255] + Z;
    const B = p[(X + 1) & 255] + Y;
    const BA = p[B & 255] + Z;
    const BB = p[(B + 1) & 255] + Z;
    
    return lerp(w, 
      lerp(v, 
        lerp(u, grad(p[AA & 255], x, y, z), grad(p[BA & 255], x - 1, y, z)),
        lerp(u, grad(p[AB & 255], x, y - 1, z), grad(p[BB & 255], x - 1, y - 1, z))
      ),
      lerp(v,
        lerp(u, grad(p[(AA + 1) & 255], x, y, z - 1), grad(p[(BA + 1) & 255], x - 1, y, z - 1)),
        lerp(u, grad(p[(AB + 1) & 255], x, y - 1, z - 1), grad(p[(BB + 1) & 255], x - 1, y - 1, z - 1))
      )
    );
  };
  
  function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(t: number, a: number, b: number) { return a + t * (b - a); }
  function grad(hash: number, x: number, y: number, z: number) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
  
  return noise;
}

let w = 0;
let h = 0;
let nt = 0;
let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;
let canvas: HTMLCanvasElement | null = null;

function getSpeed() {
  switch (props.speed) {
    case 'slow':
      return 0.001;
    case 'fast':
      return 0.002;
    default:
      return 0.001;
  }
}

const waveColors = props.colors;

function init() {
  canvas = canvasRef.value;
  if (!canvas) return;
  
  ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  w = window.innerWidth;
  h = window.innerHeight;
  
  canvas.width = w;
  canvas.height = h;
  
  if (!isSafari.value) {
    ctx.filter = `blur(${props.blur}px)`;
  }
  
  nt = 0;
  
  window.onresize = function () {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas!.width = w;
    canvas!.height = h;
    if (!isSafari.value) {
      ctx!.filter = `blur(${props.blur}px)`;
    }
  };
  
  render();
}

function drawWave(n: number) {
  if (!ctx) return;
  
  nt += getSpeed();
  for (let i = 0; i < n; i++) {
    ctx.beginPath();
    ctx.lineWidth = props.waveWidth;
    ctx.strokeStyle = waveColors[i % waveColors.length];
    
    const noise = createNoise3D();
    
    for (let x = 0; x < w; x += 5) {
      const y = noise(x / 800, 0.3 * i, nt) * 100;
      ctx.lineTo(x, y + h * 0.5);
    }
    
    ctx.stroke();
    ctx.closePath();
  }
}

function render() {
  if (!ctx || !canvas) return;
  
  ctx.fillStyle = props.backgroundFill || 'black';
  ctx.globalAlpha = props.waveOpacity || 0.5;
  ctx.fillRect(0, 0, w, h);
  
  drawWave(5);
  
  animationId = requestAnimationFrame(render);
}

onMounted(() => {
  isSafari.value = typeof window !== 'undefined' &&
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome');
  
  init();
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});
</script>
