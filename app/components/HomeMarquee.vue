<script setup lang="ts">
// Marquee con el mismo comportamiento que el de Collabs.vue (página del
// torneo): velocidad base + boost según velocidad de scroll, y cambia de
// dirección si el scroll va hacia arriba o hacia abajo.

const phrases = [
  'Effort is not negotiable',
  'Disfruta de una clase gratis',
  'Conoce nuestro torneo 2026'
];

// Repetimos las frases varias veces para que el track tenga suficiente
// ancho y el loop del marquee sea continuo.
const items = Array.from({ length: 6 }, (_, i) => phrases[i % phrases.length]) as string[];

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
  <section class="home-marquee">
    <div class="home-marquee__wrap">
      <div
        ref="trackRef"
        class="home-marquee__track"
      >
        <div class="home-marquee__set">
          <span
            v-for="(phrase, i) in items"
            :key="i"
            class="home-marquee__item"
          >
            {{ phrase }}
            <Icon
              name="mdi:asterisk"
              class="home-marquee__asterisk"
            />
          </span>
        </div>
        <div
          class="home-marquee__set"
          aria-hidden="true"
        >
          <span
            v-for="(phrase, i) in items"
            :key="'dup-' + i"
            class="home-marquee__item"
          >
            {{ phrase }}
            <Icon
              name="mdi:asterisk"
              class="home-marquee__asterisk"
            />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
