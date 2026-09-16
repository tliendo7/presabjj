<script setup lang="ts">
import Container from './Container.vue';

interface UsBlock {
  description: string;
  image: string;
  imageAlt: string;
}

interface GanbaruBlock {
  text: string;
  image: string;
  imageAlt: string;
}

interface Spring {
  value: number;
  velocity: number;
}

const { t, tm, rt } = useI18n();

const rootRef = ref<HTMLElement | null>(null);

const block = computed<UsBlock>(() => {
  const b = tm('academia.us.block') as UsBlock;
  return {
    description: rt(b.description),
    image: b.image,
    imageAlt: rt(b.imageAlt)
  };
});

const ganbaru = computed<GanbaruBlock>(() => {
  const g = tm('academia.us.ganbaru') as GanbaruBlock;
  return {
    text: rt(g.text),
    image: rt(g.image),
    imageAlt: rt(g.imageAlt)
  };
});

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
    id="equipo-santana"
    ref="rootRef"
    class="academy-us"
  >
    <Container>
      <div class="academy-us__bar-track">
        <div class="academy-us__bar-fill" />
      </div>

      <div class="academy-us__intro">
        <div class="academy-us__intro-row">
          <div class="academy-us__intro-content">
            <span class="academy-us__intro-eyebrow">{{
              t('academia.us.eyebrow')
            }}</span>
            <h2 class="academy-us__intro-heading">
              {{ t('academia.us.heading') }}
            </h2>
            <p class="academy-us__intro-text">
              {{ t('academia.us.intro') }}
            </p>
          </div>

          <!--
            Logos de los dos equipos, uno debajo del otro: primero Equipo
            Santana, después Team Ganbaru (la afiliación). Los dos son ya
            el logo real (SVG extraído del PDF que pasó el cliente).
          -->
          <div class="academy-us__logos">
            <img
              src="/images/partners/equipo-santana.svg"
              alt="Equipo Santana"
              class="academy-us__logo-santana"
            >

            <img
              src="/images/partners/team-ganbaru.svg"
              alt="Team Ganbaru"
              class="academy-us__logo-ganbaru"
            >
          </div>
        </div>
      </div>

      <div class="academy-us__block">
        <div class="academy-us__content">
          <p class="academy-us__description">
            {{ block.description }}
          </p>

          <div class="academy-us__media">
            <div class="academy-us__media-wrap">
              <NuxtImg
                src="/images/class/_CIR8579.jpg"
                alt="Clase de Brazilian Jiu-Jitsu en Presa Academy"
                class="academy-us__img"
                width="900"
                height="1200"
                format="webp"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="academy-us__block academy-us__block--ganbaru">
        <div class="academy-us__content academy-us__content--ganbaru">
          <div class="academy-us__ganbaru-media">
            <NuxtImg
              :src="ganbaru.image"
              :alt="ganbaru.imageAlt"
              class="academy-us__ganbaru-logo"
              width="900"
              height="1200"
              format="webp"
              loading="lazy"
            />
          </div>

          <p class="academy-us__description academy-us__ganbaru-text">
            {{ ganbaru.text }}
          </p>
        </div>
      </div>
    </Container>
  </section>
</template>
