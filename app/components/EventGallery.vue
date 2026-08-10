<script setup lang="ts">
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface PastEditionCard {
  id: string;
  eventName: string;
  label: string;
  year: string;
  location: string;
  type: 'video' | 'image';
  image: string;
  alt: string;
  // TODO: sustituir por la URL real del vídeo de cada edición.
  url?: string;
}

interface SpringState {
  current: number;
  velocity: number;
  target: number;
}

const { t, tm, rt } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const colCount = ref<number>(3);
const colOffsets = ref<number[]>([350, 80, 350]);
const titleOpacity = ref<number>(1);
const titleY = ref<number>(0);

const STIFFNESS = 80;
const DAMPING = 9;
const REST_THRESHOLD = 0.15;

let springs: SpringState[] = [
  { current: 350, velocity: 0, target: 350 },
  { current: 80, velocity: 0, target: 80 },
  { current: 350, velocity: 0, target: 350 }
];
const titleSpring: SpringState = { current: 0, velocity: 0, target: 0 };
let rafId = 0;

const AVAILABLE_PHOTOS = 15;

// En mobile (3 columnas) y desktop (5) las 15 fotos reparten perfecto.
// Solo en tablet (colCount === 4, ver updateColumnCount) 15 no se
// reparte igual entre columnas y la última se queda con una foto de
// menos, así que solo ahí se añade la 16ª foto para completar la
// columna.
const TABLET_COL_COUNT = 4;

const images = computed<GalleryImage[]>(() => {
  const total =
    colCount.value === TABLET_COL_COUNT ? AVAILABLE_PHOTOS + 1 : AVAILABLE_PHOTOS;

  return Array.from({ length: total }, (_, i): GalleryImage => {
    const n = i + 1;
    return {
      id: n,
      src: `/images/past-editions/presa-invitational-tournament-${n}.jpg`,
      alt: t('evento.gallery.photoAlt', { n })
    };
  });
});

// TODO: sustituir por los vídeos/imagen y enlaces definitivos de cada
// edición cuando estén disponibles.
const EDITION_STATIC_DATA = [
  {
    id: 'edicion-3',
    eventName: 'Invitational Tournament',
    location: 'Testa Training, La Laguna',
    type: 'video' as const,
    image: '/images/past-editions/2025-cover.jpg',
    url: 'https://www.instagram.com/reel/DL6przqtXjx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },
  {
    id: 'edicion-2',
    eventName: 'Invitational Tournament',
    location: 'Santa Cruz',
    type: 'image' as const,
    image: '/images/past-editions/edicion-2-cover.jpg'
  },
  {
    id: 'edicion-1',
    eventName: 'Grappling Open',
    location: 'Testa Training, La Laguna',
    type: 'image' as const,
    image: '/images/past-editions/edicion-1-cover.jpg'
  }
];

interface EditionTranslation {
  label: string;
  year: string;
  alt: string;
}

const pastEditionCards = computed<PastEditionCard[]>(() =>
  (tm('evento.gallery.editions') as EditionTranslation[]).map((edition, index) => ({
    ...EDITION_STATIC_DATA[index],
    label: rt(edition.label),
    year: rt(edition.year),
    alt: rt(edition.alt)
  }))
);

// Las cards de "Ediciones anteriores" reutilizan el mismo desplazamiento
// (colOffsets) que las columnas del grid de fotos de arriba: la card
// central se mueve como la columna central (más despacio) y las dos
// laterales se mueven como las columnas más externas del grid.
//
// En mobile las 3 cards se apilan en una sola columna, así que en vez de
// repartir velocidades distintas se mueven todas juntas, como un único
// bloque, con la misma velocidad que las columnas más externas del grid.
const isEditionsStacked = ref<boolean>(false);

const editionOuterOffset = computed((): number => colOffsets.value[0] ?? 0);
const editionCenterOffset = computed(
  (): number => colOffsets.value[Math.floor(colOffsets.value.length / 2)] ?? 0
);

const getEditionOffset = (index: number): number => {
  if (isEditionsStacked.value) return editionOuterOffset.value;
  return index === 1 ? editionCenterOffset.value : editionOuterOffset.value;
};

const imageColumns = computed((): GalleryImage[][] => {
  const cols: GalleryImage[][] = Array.from(
    { length: colCount.value },
    (): GalleryImage[] => []
  );
  images.value.forEach((img: GalleryImage, i: number) =>
    cols[i % colCount.value]?.push(img)
  );
  return cols;
});

const getColTargets = (progress: number, count: number): number[] =>
  Array.from({ length: count }, (_: unknown, i: number): number => {
    const halfSpan = Math.max(1, (count - 1) / 2);
    const distFromCenter = Math.abs(i - (count - 1) / 2) / halfSpan;
    return (1 - progress) * (400 + distFromCenter * 270);
  });

const initSprings = (count: number, progress: number): void => {
  const targets = getColTargets(progress, count);
  springs = targets.map(
    (t: number): SpringState => ({ current: t, velocity: 0, target: t })
  );
  colOffsets.value = [...targets];
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
  colOffsets.value = springs.map((s: SpringState): number =>
    Math.max(0, s.current)
  );

  const titleAcc =
    (titleSpring.target - titleSpring.current) * STIFFNESS
    - titleSpring.velocity * DAMPING;
  titleSpring.velocity += titleAcc / 60;
  titleSpring.current += titleSpring.velocity / 60;
  titleY.value = titleSpring.current;
  if (
    Math.abs(titleSpring.target - titleSpring.current) > REST_THRESHOLD
    || Math.abs(titleSpring.velocity) > REST_THRESHOLD
  )
    settled = false;

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

const updateParallax = (): void => {
  const progress = getProgress();

  const targets = getColTargets(progress, colCount.value);
  targets.forEach((t: number, i: number) => {
    springs[i].target = t;
  });

  titleSpring.target = progress * 80;

  titleOpacity.value = Math.max(0, Math.min(1, 1 - (progress - 0.55) / 0.3));

  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tick);
};

const updateColumnCount = (): void => {
  const w = window.innerWidth;
  const newCount = w >= 1024 ? 5 : w >= 768 ? 4 : 3;
  if (newCount !== colCount.value) {
    colCount.value = newCount;
    initSprings(newCount, getProgress());
  }

  // Las cards de "Ediciones anteriores" pasan a una sola columna en el
  // mismo breakpoint (md, 768px) en el que lo hace .event-gallery__editions.
  isEditionsStacked.value = w < 768;
};

onMounted((): void => {
  updateColumnCount();
  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateColumnCount, { passive: true });
  updateParallax();
});

onUnmounted((): void => {
  window.removeEventListener('scroll', updateParallax);
  window.removeEventListener('resize', updateColumnCount);
  cancelAnimationFrame(rafId);
});
</script>

<template>
  <section
    ref="sectionRef"
    class="event-gallery"
  >
    <Container>
      <h2
        class="event-gallery__title"
        :style="{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }"
      >
        {{ t('evento.gallery.heading') }}
      </h2>
      <div class="event-gallery__grid">
        <div
          v-for="(col, colIndex) in imageColumns"
          :key="colIndex"
          class="event-gallery__col"
          :style="{
            transform: `translateY(${colOffsets[colIndex]}px)`,
            willChange: 'transform'
          }"
        >
          <div
            v-for="image in col"
            :key="image.id"
            class="event-gallery__item"
          >
            <NuxtImg
              :src="image.src"
              :alt="image.alt"
              class="event-gallery__img"
              format="webp"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div
        class="event-gallery__editions-intro"
        :style="{
          transform: `translateY(${getEditionOffset(1)}px)`,
          willChange: 'transform'
        }"
      >
        <p class="event-gallery__editions-intro-text">
          {{ t('evento.gallery.editionsIntro') }}
        </p>
      </div>

      <div class="event-gallery__editions">
        <component
          :is="card.url ? 'a' : 'div'"
          v-for="(card, index) in pastEditionCards"
          :key="card.id"
          :href="card.url ?? undefined"
          :target="card.url ? '_blank' : undefined"
          :rel="card.url ? 'noopener noreferrer' : undefined"
          class="event-gallery__edition"
          :class="{ 'event-gallery__edition--video': card.type === 'video' }"
          :style="{
            transform: `translateY(${getEditionOffset(index)}px)`,
            willChange: 'transform'
          }"
        >
          <div class="event-gallery__edition-media">
            <NuxtPicture
              :src="card.image"
              :alt="card.alt"
              :img-attrs="{ class: 'event-gallery__edition-img' }"
              format="avif,webp"
              sizes="sm:100vw md:400px lg:400px xl:400px 2xl:400px"
              loading="lazy"
            />

            <div class="event-gallery__edition-overlay" />
            <div class="event-gallery__edition-gradient" />

            <Icon
              v-if="card.type === 'video'"
              name="mdi:play"
              class="event-gallery__edition-play"
            />

            <p class="event-gallery__edition-event">
              {{ card.eventName }}
            </p>
          </div>

          <div class="event-gallery__edition-info">
            <div class="event-gallery__edition-heading">
              <span class="event-gallery__edition-label">{{ card.label }}</span>
            </div>

            <div class="event-gallery__edition-meta">
              <span class="event-gallery__edition-location">
                <Icon
                  name="mdi:map-marker"
                  class="event-gallery__edition-location-icon"
                />
                {{ card.location }}
              </span>
              <span class="event-gallery__edition-year">{{ card.year }}</span>
            </div>
          </div>
        </component>
      </div>
    </Container>
  </section>
</template>
