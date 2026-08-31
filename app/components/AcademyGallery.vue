<script setup lang="ts">
const { t } = useI18n();

interface GalleryPhoto {
  src: string;
  alt: string;
}

// Mismo criterio que Collabs.vue: rutas fijas en el componente, sin pasar
// por i18n salvo el texto alternativo.
const photoSrcs = [
  '/images/class/_CIR5205.jpg',
  '/images/class/_CIR5225.jpg',
  '/images/class/_CIR5266.jpg',
  '/images/class/_CIR5322.jpg',
  '/images/class/_CIR5367.jpg',
  '/images/class/_CIR5446.jpg',
  '/images/class/_CIR7619.jpg',
  '/images/class/_CIR7699.jpg',
  '/images/class/_CIR8472.jpg',
  '/images/class/_CIR8531.jpg',
  '/images/class/_CUS0235.jpg',
  '/images/class/291025_PASJ-43.jpg'
];

const photos = computed<GalleryPhoto[]>(() =>
  photoSrcs.map((src, i) => ({
    src,
    alt: t('academia.gallery.alt', { n: i + 1 })
  }))
);

// Marquee reactivo al scroll: misma lógica que Collabs.vue. Al hacer scroll
// hacia abajo se mueve hacia la izquierda, hacia arriba se mueve hacia la
// derecha, y la velocidad se acelera con la intensidad del scroll.
const trackRef = ref<HTMLElement | null>(null);

const SPEED_DESKTOP = 1.3;
const SPEED_MOBILE = 0.7;
const VELOCITY_MULT = 0.08;
const VELOCITY_DECAY = 0.1;

let xPos = 0;
let scrollDirection = 1;
let speedBoost = 0;
let lastScrollY = 0;
let rafId: number | null = null;

let mobileQuery: MediaQueryList | null = null;

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const baseSpeed = (): number =>
  mobileQuery?.matches ? SPEED_MOBILE : SPEED_DESKTOP;

const handleScroll = (): void => {
  const delta = window.scrollY - lastScrollY;
  lastScrollY = window.scrollY;
  if (delta === 0) return;

  scrollDirection = delta > 0 ? 1 : -1;
  speedBoost += Math.abs(delta) * VELOCITY_MULT;
};

const tick = (): void => {
  rafId = requestAnimationFrame(tick);

  if (!trackRef.value) return;

  speedBoost = lerp(speedBoost, 0, VELOCITY_DECAY);
  xPos -= scrollDirection * (baseSpeed() + speedBoost);

  const halfWidth = trackRef.value.scrollWidth / 2;
  if (halfWidth > 0) {
    if (xPos <= -halfWidth) xPos += halfWidth;
    if (xPos > 0) xPos -= halfWidth;
  }

  trackRef.value.style.transform = `translateX(${xPos}px)`;
};

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 768px)');
  lastScrollY = window.scrollY;
  window.addEventListener('scroll', handleScroll, { passive: true });
  rafId = requestAnimationFrame(tick);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <section class="academy-gallery">
    <div class="academy-gallery__marquee-wrap">
      <div
        ref="trackRef"
        class="academy-gallery__marquee-track"
      >
        <div class="academy-gallery__marquee-set">
          <div
            v-for="photo in photos"
            :key="photo.src"
            class="academy-gallery__item"
          >
            <NuxtImg
              :src="photo.src"
              :alt="photo.alt"
              class="academy-gallery__img"
              width="520"
              height="693"
              format="webp"
              loading="lazy"
            />
          </div>
        </div>
        <div
          class="academy-gallery__marquee-set"
          aria-hidden="true"
        >
          <div
            v-for="photo in photos"
            :key="'dup-' + photo.src"
            class="academy-gallery__item"
          >
            <NuxtImg
              :src="photo.src"
              :alt="photo.alt"
              class="academy-gallery__img"
              width="520"
              height="693"
              format="webp"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
