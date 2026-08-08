<script setup lang="ts">
// 1. Imports
// (ref, computed, onMounted, onUnmounted y useI18n se auto-importan en Nuxt)

// 2. Types
interface Product {
  id: string;
  image: string;
  name: string;
  gridColumn: number;
  gridRow: number;
  parallaxGroup: number;
}

interface SpringState {
  current: number;
  velocity: number;
  target: number;
}

// 5. Composables
const { t, tm, rt } = useI18n();

// 6. Reactive variables
const sectionRef = ref<HTMLElement | null>(null);
const groupOffsets = ref<number[]>([0, 0]);

// No son "columnas" en el sentido literal del grid (ver CARD_LAYOUT):
// son los dos grupos de velocidad del parallax. Grupo 0 = columnas 1 y 3
// del grid de escritorio, grupo 1 = columnas 2 y 4 (misma velocidad cada
// una, tal y como pidió Clara).
const PARALLAX_GROUP_COUNT = 2;
const STIFFNESS = 80;
const DAMPING = 9;
const REST_THRESHOLD = 0.15;

// ── Curva de entrada (mismo criterio que Merchandising.vue) ──
// El borde superior de la sección arranca casi plano y se curva más
// cuanto más se adentra en el viewport al hacer scroll.
const MIN_CURVE_RY = 20;
const MAX_CURVE_RY = 100;
const curveRy = ref(MIN_CURVE_RY);

let springs: SpringState[] = Array.from(
  { length: PARALLAX_GROUP_COUNT },
  (): SpringState => ({ current: 0, velocity: 0, target: 0 })
);
let rafId = 0;

// Imágenes fijas en el componente: mismo criterio que Merchandising.vue.
// Contenido de relleno hasta definir el catálogo real de la tienda.
const imageSrcs: string[] = [
  '/images/merch/090526_SBJJ_Camisetas-2.jpg',
  '/images/merch/090526_SBJJ_Camisetas-14.jpg',
  '/images/merch/090526_SBJJ_Camisetas-16.jpg',
  '/images/merch/090526_SBJJ_Camisetas-3.jpg',
  '/images/merch/090526_SBJJ_Camisetas-5.jpg'
];

// Posición de cada card en el grid de 4 columnas de escritorio (ver
// .home-store__grid en el CSS) y a qué grupo de parallax pertenece.
// El texto ocupa columnas 1-2 en la fila 1, así que las dos cards
// "nuevas" (índices 4 y 5) van debajo, en columnas 1-2 fila 2, y las 4
// cards originales se quedan en columnas 3-4 (filas 1 y 2). En mobile
// (grid de 2 columnas) este orden coincide 1:1 con el auto-flow, así
// que no hace falta ninguna posición explícita ahí.
const CARD_LAYOUT: { gridColumn: number; gridRow: number; parallaxGroup: number }[] = [
  { gridColumn: 3, gridRow: 1, parallaxGroup: 0 },
  { gridColumn: 4, gridRow: 1, parallaxGroup: 1 },
  { gridColumn: 3, gridRow: 2, parallaxGroup: 0 },
  { gridColumn: 4, gridRow: 2, parallaxGroup: 1 },
  { gridColumn: 1, gridRow: 2, parallaxGroup: 0 },
  { gridColumn: 2, gridRow: 2, parallaxGroup: 1 }
];

// 7. Computed properties
const products = computed<Product[]>(() =>
  (tm('home.store.items') as { name: string }[]).map(
    (item, i): Product => {
      const layout = CARD_LAYOUT[i % CARD_LAYOUT.length];

      return {
        id: `product-${i}`,
        image: imageSrcs[i % imageSrcs.length],
        name: rt(item.name),
        gridColumn: layout.gridColumn,
        gridRow: layout.gridRow,
        parallaxGroup: layout.parallaxGroup
      };
    }
  )
);

// 8. Functions

// Amplitud del recorrido por breakpoint: en desktop el grupo 0 apenas se
// mueve (base) y el grupo 1 recorre mucho más (base + range) — ese
// contraste fuerte es el que queda bien ahí. En mobile, con menos ancho
// de pantalla, ese mismo contraste se sentía exagerado (una columna casi
// estática y la otra moviéndose "un montón"), así que se suaviza: el
// grupo 0 se mueve más de lo que se movía y el grupo 1 bastante menos.
const DESKTOP_BASE_OFFSET = 16;
const DESKTOP_OFFSET_RANGE = 320;
const MOBILE_BASE_OFFSET = 50;
const MOBILE_OFFSET_RANGE = 90;
const MOBILE_BREAKPOINT = 1024;

// Cada grupo recorre una distancia distinta al hacer scroll (el grupo de
// la derecha avanza más que el de la izquierda), generando el efecto de
// parallax por columnas inspirado en el grid de cascos de
// landonorris.com.
const getGroupTargets = (progress: number): number[] => {
  const isDesktop = window.innerWidth >= MOBILE_BREAKPOINT;
  const baseOffset = isDesktop ? DESKTOP_BASE_OFFSET : MOBILE_BASE_OFFSET;
  const offsetRange = isDesktop ? DESKTOP_OFFSET_RANGE : MOBILE_OFFSET_RANGE;

  return Array.from(
    { length: PARALLAX_GROUP_COUNT },
    (_: unknown, i: number): number => {
      const speedFactor = i / Math.max(1, PARALLAX_GROUP_COUNT - 1);
      return (1 - progress) * (baseOffset + speedFactor * offsetRange);
    }
  );
};

const initSprings = (progress: number): void => {
  const targets = getGroupTargets(progress);
  springs = targets.map(
    (value: number): SpringState => ({
      current: value,
      velocity: 0,
      target: value
    })
  );
  groupOffsets.value = [...targets];
};

const tick = (): void => {
  let settled = true;

  springs.forEach((s: SpringState) => {
    const acceleration =
      (s.target - s.current) * STIFFNESS - s.velocity * DAMPING;
    s.velocity += acceleration / 60;
    s.current += s.velocity / 60;
    if (
      Math.abs(s.target - s.current) > REST_THRESHOLD
      || Math.abs(s.velocity) > REST_THRESHOLD
    )
      settled = false;
  });
  groupOffsets.value = springs.map((s: SpringState): number => s.current);

  if (!settled) rafId = requestAnimationFrame(tick);
};

const getProgress = (): number => {
  if (!sectionRef.value) return 0;
  const rect = sectionRef.value.getBoundingClientRect();
  return Math.max(
    0,
    Math.min(1, (window.innerHeight - rect.top) / rect.height)
  );
};

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

const updateParallax = (): void => {
  const progress = getProgress();
  const targets = getGroupTargets(progress);
  targets.forEach((target: number, i: number) => {
    springs[i].target = target;
  });

  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tick);

  updateCurve();
};

// 9. Lifecycle functions
onMounted((): void => {
  initSprings(getProgress());
  updateCurve();
  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateParallax, { passive: true });
});

onUnmounted((): void => {
  window.removeEventListener('scroll', updateParallax);
  window.removeEventListener('resize', updateParallax);
  cancelAnimationFrame(rafId);
});
</script>

<template>
  <section
    ref="sectionRef"
    class="home-store"
  >
    <div
      class="home-store__top-curve"
      aria-hidden="true"
      :style="{ clipPath: `ellipse(70% ${curveRy}% at 50% 0%)` }"
    />

    <Container>
      <!--
        Grid único de 4 columnas (2 en mobile): el texto ocupa las
        columnas 1-2 en la fila 1 (col-span-2) y las cards se colocan
        explícitamente vía CARD_LAYOUT en desktop (ver CSS, breakpoint
        lg). En mobile no hace falta posición explícita: el orden del
        array ya coincide con el auto-flow de 2 columnas.
      -->
      <div class="home-store__grid">
        <div class="home-store__content">
          <h2 class="home-store__heading">
            {{ t('home.store.heading') }}
          </h2>
          <p class="home-store__intro">
            {{ t('home.store.intro') }}
          </p>
          <Button
            class="home-store__cta"
            :label="t('home.store.cta')"
            icon-name="mdi:arrow-top-right"
            icon-position="right"
            variant="outline"
          />
        </div>

        <div
          v-for="product in products"
          :key="product.id"
          class="home-store__card"
          :style="{
            '--card-col': product.gridColumn,
            '--card-row': product.gridRow,
            transform: `translateY(${groupOffsets[product.parallaxGroup]}px)`,
            willChange: 'transform'
          }"
        >
          <!--
            El recorte con muesca se hace con mask-image, que clipa TODO
            lo que haya dentro de este wrapper (por eso el label vive
            fuera, como hermano, y no como hijo de esta capa).
          -->
          <div class="home-store__frame-mask">
            <svg
              class="home-store__frame home-store__frame--base"
              viewBox="0 0 407 411"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 .5h390.89a7.5 7.5 0 0 1 7.5 7.5v356.983a7.5 7.5 0 0 1-7.5 7.5H150a23.502 23.502 0 0 0-18.375 8.849l-16.499 20.695a22.502 22.502 0 0 1-17.593 8.473H8A7.5 7.5 0 0 1 .5 403V8A7.5 7.5 0 0 1 8 .5Z"
              />
            </svg>
            <svg
              class="home-store__frame home-store__frame--accent"
              viewBox="0 0 407 411"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 .5h390.89a7.5 7.5 0 0 1 7.5 7.5v356.983a7.5 7.5 0 0 1-7.5 7.5H150a23.502 23.502 0 0 0-18.375 8.849l-16.499 20.695a22.502 22.502 0 0 1-17.593 8.473H8A7.5 7.5 0 0 1 .5 403V8A7.5 7.5 0 0 1 8 .5Z"
              />
            </svg>

            <div class="home-store__media">
              <NuxtImg
                :src="product.image"
                :alt="product.name"
                class="home-store__img"
                format="webp"
                loading="lazy"
              />
            </div>
          </div>

          <div class="home-store__label">
            <span class="home-store__label-name">
              {{ product.name }}
            </span>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
