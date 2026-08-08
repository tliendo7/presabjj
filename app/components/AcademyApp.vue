<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const { t } = useI18n();

const panelRef = ref<HTMLElement | null>(null);
const bgScale = ref(1.18);
const bgOffsetY = ref(0);

const MAX_SCALE = 1.18;
const MIN_SCALE = 1;
// Max vertical drift (px) of the background image. Bounded and driven by
// the clamped `progress` value below — NOT by raw scroll distance — so the
// image never drifts further than the extra size the scale gives it,
// however far offscreen the panel starts.
const MAX_PARALLAX_OFFSET = 32;

let ticking = false;
let rafId: number | null = null;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const update = (): void => {
  ticking = false;
  if (!panelRef.value) return;

  const rect = panelRef.value.getBoundingClientRect();
  const vh = window.innerHeight;
  const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);

  bgScale.value = MAX_SCALE - progress * (MAX_SCALE - MIN_SCALE);
  bgOffsetY.value = (progress - 0.5) * 2 * MAX_PARALLAX_OFFSET;
};

const onScroll = (): void => {
  if (!ticking) {
    ticking = true;
    rafId = requestAnimationFrame(update);
  }
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onScroll);
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <section class="academy-app">
    <Container>
      <div
        ref="panelRef"
        class="academy-app__panel"
      >
        <div class="academy-app__bg">
          <NuxtPicture
            src="/images/class/_CIR5783.jpg"
            :alt="t('academia.app.bgAlt')"
            :img-attrs="{
              class: 'academy-app__bg-image',
              style: `transform: translateY(${bgOffsetY}px) scale(${bgScale})`
            }"
            format="avif,webp"
            sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
          />
          <div
            class="academy-app__overlay"
            aria-hidden="true"
          />
        </div>

        <div class="academy-app__grid">
          <div class="academy-app__image-col">
            <NuxtImg
              src="/images/class/mobile.png"
              :alt="t('academia.app.phoneAlt')"
              class="academy-app__phone"
              format="webp"
              loading="lazy"
            />
          </div>

          <div class="academy-app__text-col">
            <h2 class="academy-app__heading">
              {{ t('academia.app.heading') }}
            </h2>
            <p class="academy-app__description">
              {{ t('academia.app.description') }}
            </p>
            <a
              class="academy-app__cta"
              :href="t('academia.app.ctaHref')"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('academia.app.cta') }}
            </a>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
