<script setup lang="ts">
interface CollageItem {
  id: number;
  src: string;
  alt: string;
}

const { t, tm, rt } = useI18n();

// ── Curva progresiva de entrada ──────────────────────────────
// El borde superior arranca casi plano y se curva más cuanto más
// se adentra la sección en el viewport al hacer scroll.
const MIN_CURVE_RY = 20;
const MAX_CURVE_RY = 100;

const sectionRef = ref<HTMLElement | null>(null);
const curveRy = ref(MIN_CURVE_RY);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const updateCurve = (): void => {
  if (!sectionRef.value) return;

  const rect = sectionRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // 0 → el borde superior de la sección toca el borde inferior del viewport.
  // 1 → el borde superior de la sección ha llegado a la parte alta del viewport.
  const progress = clamp((viewportHeight - rect.top) / viewportHeight, 0, 1);

  curveRy.value = MIN_CURVE_RY + progress * (MAX_CURVE_RY - MIN_CURVE_RY);
};

onMounted(() => {
  window.addEventListener('scroll', updateCurve, { passive: true });
  window.addEventListener('resize', updateCurve);
  updateCurve();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateCurve);
  window.removeEventListener('resize', updateCurve);
});

const collageSrcs = [
  '/images/merch/090526_SBJJ_Camisetas-3.jpg',
  '/images/merch/090526_SBJJ_Camisetas-14.jpg',
  '/images/merch/090526_SBJJ_Camisetas-5.jpg',
  '/images/merch/090526_SBJJ_Camisetas-5.jpg',
  '/images/merch/presa-culture.png'
];

interface MerchItem {
  alt: string;
}

const collageItems = computed<CollageItem[]>(() =>
  (tm('evento.merch.items') as MerchItem[]).map((item, index) => ({
    id: index + 1,
    src: collageSrcs[index] ?? '',
    alt: rt(item.alt)
  }))
);
</script>

<template>
  <section
    ref="sectionRef"
    class="merchandising"
  >
    <div
      class="merchandising__top-curve"
      aria-hidden="true"
      :style="{ clipPath: `ellipse(70% ${curveRy}% at 50% 0%)` }"
    />

    <Container>
      <div class="merchandising__layout">
        <div class="merchandising__content">
          <h2 class="merchandising__heading">
            <span class="merchandising__heading-line"> {{ t('evento.merch.headingLine1') }} </span>
            <span class="merchandising__heading-line"> {{ t('evento.merch.headingLine2') }} </span>
            <span
              class="merchandising__heading-line merchandising__heading-line--accent"
            >
              {{ t('evento.merch.headingLine3') }}
            </span>
          </h2>

          <TextLineReveal
            class="merchandising__description"
            :text="t('evento.merch.description')"
          />

          <Button
            class="merchandising__cta"
            :label="t('evento.merch.cta')"
            icon-name="mdi:arrow-top-right"
            icon-position="right"
            variant="outline"
          />

          <div class="merchandising__figure merchandising__figure--primary">
            <NuxtImg
              :src="collageItems[0]?.src"
              :alt="collageItems[0]?.alt"
              class="merchandising__img"
              format="webp"
              loading="lazy"
            />
          </div>
        </div>

        <div class="merchandising__collage">
          <div class="merchandising__figure merchandising__figure--secondary">
            <NuxtImg
              :src="collageItems[1]?.src"
              :alt="collageItems[1]?.alt"
              class="merchandising__img"
              format="webp"
              loading="lazy"
            />
          </div>

          <div class="merchandising__figure merchandising__figure--tertiary">
            <NuxtImg
              :src="collageItems[3]?.src"
              :alt="collageItems[3]?.alt"
              class="merchandising__img"
              format="webp"
              loading="lazy"
            />
          </div>

          <div class="merchandising__figure merchandising__figure--quaternary">
            <NuxtImg
              :src="collageItems[2]?.src"
              :alt="collageItems[2]?.alt"
              class="merchandising__img"
              format="webp"
              loading="lazy"
            />
          </div>

          <div class="merchandising__figure merchandising__figure--quinary">
            <NuxtImg
              :src="collageItems[4]?.src"
              :alt="collageItems[4]?.alt"
              class="merchandising__img"
              format="webp"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
