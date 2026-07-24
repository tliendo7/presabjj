<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const { t } = useI18n();

const panelRef = ref<HTMLElement | null>(null);
const bgScale = ref(1.18);
const bgOffsetY = ref(0);

const MAX_SCALE = 1.18;
const MIN_SCALE = 1;
const PARALLAX_SPEED = 0.12;

let ticking = false;
let rafId: number | null = null;

const heading = computed<string>(() => t('academia.app.heading'));
const description = computed<string>(() => t('academia.app.description'));
const cta = computed<string>(() => t('academia.app.cta'));
const ctaHref = computed<string>(() => t('academia.app.ctaHref'));
const phoneAlt = computed<string>(() => t('academia.app.phoneAlt'));
const bgAlt = computed<string>(() => t('academia.app.bgAlt'));

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const update = (): void => {
  ticking = false;
  if (!panelRef.value) return;

  const rect = panelRef.value.getBoundingClientRect();
  const vh = window.innerHeight;
  const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);

  bgScale.value = MAX_SCALE - progress * (MAX_SCALE - MIN_SCALE);

  const offset = -rect.top;
  bgOffsetY.value = offset * PARALLAX_SPEED;
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
          <img
            src="/images/past-events/presa-invitational-tournament-5.jpg"
            :alt="bgAlt"
            class="academy-app__bg-image"
            :style="{
              transform: `translateY(${bgOffsetY}px) scale(${bgScale})`
            }"
          >
          <div
            class="academy-app__overlay"
            aria-hidden="true"
          />
        </div>

        <div class="academy-app__grid">
          <div class="academy-app__image-col">
            <img
              src="/images/__dummy/mobile-product-1.avif"
              :alt="phoneAlt"
              class="academy-app__phone"
            >
          </div>

          <div class="academy-app__text-col">
            <h2 class="academy-app__heading">
              {{ heading }}
            </h2>
            <TextLineReveal
              class="academy-app__description"
              :text="description"
              color="#e4e4e4"
            />
            <a
              class="academy-app__cta"
              :href="ctaHref"
            >
              {{ cta }}
            </a>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
