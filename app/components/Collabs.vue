<script setup lang="ts">
const logos = [
  { name: 'Deporte Lagunero', src: '/images/partners/deporte-lagunero.png' },
  { name: 'DxD', src: '/images/partners/dxd.png' },
  { name: 'Ganbaru', src: '/images/partners/ganbaru.png' },
  { name: 'Presa', src: '/images/partners/presa.png' },
  { name: 'Santana', src: '/images/partners/santana.png' },
  { name: 'BB', src: '/images/partners/bb.png' },
  { name: 'Corpus', src: '/images/partners/corpus.png' },
  { name: 'Kglez Joyas', src: '/images/partners/kglez-joyas.png' },
  { name: 'Musicanarias', src: '/images/partners/musicanarias.png' },
  { name: 'Testa', src: '/images/partners/testa.webp' }
];

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

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const baseSpeed = () => (mobileQuery?.matches ? SPEED_MOBILE : SPEED_DESKTOP);

const handleScroll = () => {
  const delta = window.scrollY - lastScrollY;
  lastScrollY = window.scrollY;
  if (delta === 0) return;

  scrollDirection = delta > 0 ? 1 : -1;
  speedBoost += Math.abs(delta) * VELOCITY_MULT;
};

const tick = () => {
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
  <section class="collabs">
    <Container>
      <div class="collabs__header">
        <div class="collabs__title-block">
          <h2 class="collabs__title-main">IMPULSANDO LA</h2>
          <h2 class="collabs__title-sub">CULTURA JUNTOS</h2>
        </div>
        <TextLineReveal
          class="collabs__meta"
          text="Presa colabora con marcas que comparten su pasión por el deporte, la
          excelencia y el espíritu competitivo."
        />
      </div>
    </Container>

    <div class="collabs__marquee-wrap">
      <div
        ref="trackRef"
        class="collabs__marquee-track"
      >
        <div class="collabs__marquee-set">
          <div
            v-for="logo in logos"
            :key="logo.name"
            class="collabs__logo-item"
          >
            <img
              :src="logo.src"
              :alt="logo.name"
              class="collabs__logo-img"
            />
          </div>
        </div>
        <div
          class="collabs__marquee-set"
          aria-hidden="true"
        >
          <div
            v-for="logo in logos"
            :key="'dup-' + logo.name"
            class="collabs__logo-item"
          >
            <img
              :src="logo.src"
              :alt="logo.name"
              class="collabs__logo-img"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
