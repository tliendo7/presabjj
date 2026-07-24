<script setup lang="ts">
import Button from './Button.vue';
import Container from './Container.vue';

interface UsBlock {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
}

interface Spring {
  value: number;
  velocity: number;
}

const { t, tm, rt } = useI18n();

const rootRef = ref<HTMLElement | null>(null);

const eyebrow = computed<string>(() => t('academia.us.eyebrow'));
const heading = computed<string>(() => t('academia.us.heading'));
const intro = computed<string>(() => t('academia.us.intro'));

const blocks = computed<UsBlock[]>(() =>
  (tm('academia.us.blocks') as UsBlock[]).map(b => ({
    eyebrow: rt(b.eyebrow),
    title: rt(b.title),
    description: rt(b.description),
    cta: rt(b.cta),
    image: b.image,
    imageAlt: rt(b.imageAlt)
  }))
);

let barTracks: HTMLElement[] = [];
let barFills: HTMLElement[] = [];
let mediaWraps: HTMLElement[] = [];
let mediaImgs: HTMLElement[] = [];
let springs: Spring[] = [];
let rafId: number | null = null;
let reduceMotion = false;

const clamp01 = (n: number): number => Math.max(0, Math.min(1, n));

const easeOutQuad = (p: number): number => 1 - (1 - p) ** 2;

const setFinalState = (): void => {
  barFills.forEach(el => (el.style.transform = 'scaleX(1)'));
  mediaImgs.forEach(el => {
    el.style.height = '100%';
    el.style.transform = 'scale(1)';
  });
};

const tick = (): void => {
  const vh = window.innerHeight;

  barTracks.forEach((track, i) => {
    const fill = barFills[i];
    if (!fill) return;

    const rect = track.getBoundingClientRect();
    const start = vh; // bar starts filling as it enters from the bottom
    const end = vh * 0.4; // finishes once it reaches 40% of the viewport
    const raw = clamp01((start - rect.top) / (start - end));

    const spring = springs[i];
    const stiffness = 0.09;
    const damping = 0.72;
    spring.velocity =
      (spring.velocity + (raw - spring.value) * stiffness) * damping;
    spring.value += spring.velocity;

    fill.style.transform = `scaleX(${spring.value})`;
  });

  mediaWraps.forEach((wrap, i) => {
    const img = mediaImgs[i];
    if (!img) return;

    const rect = wrap.getBoundingClientRect();
    const start = vh * 0.8;
    const raw = clamp01((start - rect.top) / start);
    const eased = easeOutQuad(raw);

    img.style.height = `${eased * 100}%`;
    img.style.transform = `scale(${1.2 - eased * 0.2})`;
  });

  rafId = requestAnimationFrame(tick);
};

onMounted(() => {
  if (!rootRef.value) return;

  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  barTracks = Array.from(
    rootRef.value.querySelectorAll<HTMLElement>('.academy-us__bar-track')
  );
  barFills = Array.from(
    rootRef.value.querySelectorAll<HTMLElement>('.academy-us__bar-fill')
  );
  mediaWraps = Array.from(
    rootRef.value.querySelectorAll<HTMLElement>('.academy-us__media-wrap')
  );
  mediaImgs = Array.from(
    rootRef.value.querySelectorAll<HTMLElement>('.academy-us__img')
  );
  springs = barTracks.map(() => ({ value: 0, velocity: 0 }));

  if (reduceMotion) {
    setFinalState();
    return;
  }

  rafId = requestAnimationFrame(tick);
});

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <section
    ref="rootRef"
    class="academy-us"
  >
    <Container>
      <div class="academy-us__intro">
        <span class="academy-us__intro-eyebrow">{{ eyebrow }}</span>
        <h2 class="academy-us__intro-heading">
          {{ heading }}
        </h2>
        <p class="academy-us__intro-text">
          {{ intro }}
        </p>
      </div>

      <div
        v-for="block in blocks"
        :key="block.title"
        class="academy-us__block"
      >
        <div class="academy-us__bar-track">
          <div class="academy-us__bar-fill" />
        </div>

        <div class="academy-us__content">
          <div class="academy-us__text">
            <div class="academy-us__title-block">
              <span class="academy-us__eyebrow">{{ block.eyebrow }}</span>
              <h3 class="academy-us__title">
                {{ block.title }}
              </h3>
              <Button
                v-if="block.cta"
                class="academy-us__cta"
                :label="block.cta"
                icon-name="mdi:arrow-right"
                icon-position="right"
                variant="secondary"
              />
            </div>

            <p class="academy-us__description">
              {{ block.description }}
            </p>
          </div>

          <div class="academy-us__media">
            <div class="academy-us__media-wrap">
              <img
                :src="block.image"
                :alt="block.imageAlt"
                class="academy-us__img"
              >
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
