<script setup lang="ts">
// 1. Imports
// (ref, onMounted, onUnmounted, useI18n y useLocalePath se auto-importan
// en Nuxt)

// 2. Types
interface Spring {
  value: number;
  velocity: number;
}

// 5. Composables
const { t } = useI18n();
const localePath = useLocalePath();

// 6. Reactive variables
const rootRef = ref<HTMLElement | null>(null);

let barTrack: HTMLElement | null = null;
let barFill: HTMLElement | null = null;
const spring: Spring = { value: 0, velocity: 0 };
let rafId: number | null = null;

// 8. Functions
const clamp01 = (n: number): number => Math.max(0, Math.min(1, n));

// Mismo criterio que .academy-us__bar-track/.academy-us__bar-fill en
// AcademyUs.vue (sección "Quiénes somos" de la academia): la barra se
// rellena con un muelle a medida que entra en el viewport, y termina de
// llenarse al llegar al 40% de la altura de la pantalla.
const tick = (): void => {
  if (!barTrack || !barFill) return;

  const vh = window.innerHeight;
  const rect = barTrack.getBoundingClientRect();
  const start = vh; // la barra empieza a llenarse al entrar desde abajo
  const end = vh * 0.4; // termina de llenarse al llegar al 40% del viewport
  const raw = clamp01((start - rect.top) / (start - end));

  const stiffness = 0.09;
  const damping = 0.72;
  spring.velocity =
    (spring.velocity + (raw - spring.value) * stiffness) * damping;
  spring.value += spring.velocity;

  barFill.style.transform = `scaleX(${spring.value})`;

  rafId = requestAnimationFrame(tick);
};

// 9. Lifecycle functions
onMounted((): void => {
  if (!rootRef.value) return;

  barTrack = rootRef.value.querySelector<HTMLElement>(
    '.home-academy__bar-track'
  );
  barFill = rootRef.value.querySelector<HTMLElement>('.home-academy__bar-fill');

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reduceMotion) {
    if (barFill) barFill.style.transform = 'scaleX(1)';
    return;
  }

  rafId = requestAnimationFrame(tick);
});

onUnmounted((): void => {
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <section
    ref="rootRef"
    class="home-academy"
  >
    <Container>
      <div class="home-academy__bar-track">
        <div class="home-academy__bar-fill" />
      </div>

      <div class="home-academy__layout">
        <div class="home-academy__content">
          <h2 class="home-academy__heading">
            {{ t('home.academy.heading') }}
          </h2>
          <p class="home-academy__intro">
            {{ t('home.academy.intro') }}
          </p>
          <NuxtLink
            :to="localePath('academia')"
            class="home-academy__cta-link"
          >
            <Button
              :label="t('home.academy.cta')"
              icon-name="mdi:arrow-right"
              icon-position="right"
              variant="outline"
            />
          </NuxtLink>
        </div>

        <div class="home-academy__media">
          <NuxtPicture
            src="/images/seminars/090526_SBJJ_TaylorPearman-83.jpg"
            :alt="t('home.academy.imageAlt')"
            :img-attrs="{ class: 'home-academy__img' }"
            format="avif,webp"
            sizes="sm:100vw md:50vw lg:50vw xl:50vw 2xl:50vw"
            loading="lazy"
          />
        </div>
      </div>

      <!--
        Grid de 4 columnas: imagen (col 1-2) · vídeo vertical (col 3) ·
        texto (col 4). La celda de la imagen es a su vez OTRO grid de 2
        filas: arriba la foto de siempre, abajo un texto y una segunda
        foto (formato 4/3) en 2 columnas.
      -->
      <div class="home-academy__extra">
        <div class="home-academy__extra-image">
          <div class="home-academy__extra-image-media">
            <NuxtImg
              src="/images/class/_CIR7888.jpg"
              :alt="t('home.academy.extra.imageAlt')"
              class="home-academy__extra-img"
              width="1440"
              height="1080"
              format="webp"
              loading="lazy"
            />
          </div>

          <div class="home-academy__extra-secondary-text">
            <p class="home-academy__extra-secondary-description">
              {{ t('home.academy.extra.secondaryText') }}
            </p>
            <NuxtLink
              :to="localePath({ name: 'academia', hash: '#horarios' })"
              class="home-academy__extra-secondary-link"
            >
              <span class="home-academy__extra-secondary-link-text">{{
                t('home.academy.extra.secondaryLink')
              }}</span>
              <Icon name="mdi:arrow-right" />
            </NuxtLink>
          </div>

          <div class="home-academy__extra-secondary-image">
            <NuxtImg
              src="/images/class/_CUS-santana-ganbaru-roll.jpg"
              :alt="t('home.academy.extra.secondaryImageAlt')"
              class="home-academy__extra-img"
              width="1080"
              height="1080"
              format="webp"
              loading="lazy"
            />
          </div>
        </div>

        <div class="home-academy__extra-video">
          <video
            class="home-academy__extra-video-el"
            src="/videos/video-niños-bjj.mp4"
            poster="/videos/posters/video-ninos-bjj.jpg"
            preload="metadata"
            :aria-label="t('home.academy.extra.videoAlt')"
            autoplay
            muted
            loop
            playsinline
          />
        </div>

        <div class="home-academy__extra-text">
          <p class="home-academy__extra-description">
            {{ t('home.academy.extra.text') }}
          </p>

          <img
            src="/images/partners/equipo-santana.svg"
            alt="Equipo Santana"
            class="home-academy__extra-logo"
          >
        </div>
      </div>
    </Container>
  </section>
</template>
