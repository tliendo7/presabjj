<script setup lang="ts">
// 1. Imports
// (ref, computed, onMounted, onUnmounted y useI18n se auto-importan en Nuxt)

// 2. Types
type EventType = 'evento' | 'seminario' | 'masterclass';

interface EventItem {
  id: string;
  image: string;
  date: string;
  caption: string;
  type: EventType;
  typeLabel: string;
}

// 5. Composables
const { t, tm, rt } = useI18n();

// 6. Reactive variables
const trackRef = ref<HTMLElement | null>(null);
const activeIndex = ref<number>(0);
let rafId = 0;

// Imágenes fijas en el componente: mismo criterio que Collabs.vue /
// AcademyGallery.vue. El orden tiene que coincidir 1:1 con
// home.events.items (mismo índice) en es.json/en.json.
const imageSrcs: string[] = [
  '/images/seminars/cover-taylor-pearman.jpg',
  '/images/seminars/cover-circuito-canario-bjj.jpg',
  '/images/seminars/cover-ezekiel-zayas.webp',
  '/images/seminars/cover-aron-hernandez.jpg',
  '/images/seminars/cover-mani-tavanaei.webp',
  '/images/seminars/cover-santeri-lilius.jpg',
  '/images/seminars/cover-campeonato-españa.jpg'
];

// 7. Computed properties
const events = computed<EventItem[]>(() =>
  (
    tm('home.events.items') as {
      date: string;
      caption: string;
      type: EventType;
    }[]
  ).map((item, i): EventItem => {
    const type = rt(item.type) as EventType;

    return {
      id: `event-${i}`,
      image: imageSrcs[i % imageSrcs.length],
      date: rt(item.date),
      caption: rt(item.caption),
      type,
      typeLabel: t(`home.events.types.${type}`)
    };
  })
);

const canScrollPrev = computed<boolean>(() => activeIndex.value > 0);
const canScrollNext = computed<boolean>(
  () => activeIndex.value < events.value.length - 1
);

// 8. Functions
// Los dots no representan "qué card está encajada" (con varias cards
// visibles a la vez, esa card puede no llegar nunca a ser exactamente la
// última: el scroll se queda corto antes de que encaje del todo). En su
// lugar, los dots son un indicador de progreso: se reparten en proporción
// a cuánto se ha recorrido del scroll total, así el primero siempre
// corresponde a scrollLeft = 0 y el último a scrollLeft = máximo.
// Las flechas (canScrollPrev/canScrollNext, arriba) derivan de este mismo
// índice, así que al llegar al final el último dot se activa y la flecha
// derecha desaparece.
const updateActiveIndex = (): void => {
  const track = trackRef.value;
  if (!track) return;

  const total = events.value.length;
  const maxScrollLeft = track.scrollWidth - track.clientWidth;

  if (total <= 1 || maxScrollLeft <= 0) {
    activeIndex.value = 0;
    return;
  }

  const progress = track.scrollLeft / maxScrollLeft;
  activeIndex.value = Math.min(
    total - 1,
    Math.max(0, Math.round(progress * (total - 1)))
  );
};

const handleScroll = (): void => {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(updateActiveIndex);
};

const scrollByCard = (direction: 1 | -1): void => {
  const track = trackRef.value;
  if (!track) return;

  const firstCard = track.children[0] as HTMLElement | undefined;
  const gap = parseFloat(getComputedStyle(track).columnGap || '0');
  const step = firstCard
    ? firstCard.getBoundingClientRect().width + gap
    : track.clientWidth * 0.85;

  track.scrollBy({ left: direction * step, behavior: 'smooth' });
};

const scrollToIndex = (index: number): void => {
  const track = trackRef.value;
  const card = track?.children[index] as HTMLElement | undefined;
  if (!track || !card) return;

  track.scrollTo({
    left: card.offsetLeft - track.offsetLeft,
    behavior: 'smooth'
  });
};

// 9. Lifecycle functions
onMounted((): void => {
  // Algunos navegadores restauran el scrollLeft de contenedores con overflow
  // al recargar la página, aunque el primer render se vea en la posición 0.
  // Forzamos el inicio para que el estado (dots y flechas) sea siempre
  // consistente con lo que se ve.
  if (trackRef.value) trackRef.value.scrollLeft = 0;

  updateActiveIndex();
  trackRef.value?.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', updateActiveIndex);
});

onUnmounted((): void => {
  trackRef.value?.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', updateActiveIndex);
  cancelAnimationFrame(rafId);
});
</script>

<template>
  <section class="home-events">
    <Container>
      <div class="home-events__header">
        <div class="home-events__header-bar">
          <span
            class="home-events__intro-square"
            aria-hidden="true"
          />
        </div>

        <div class="home-events__header-columns">
          <div class="home-events__intro-col">
            <h2 class="home-events__heading">
              {{ t('home.events.heading') }}
            </h2>
          </div>

          <div class="home-events__intro-col">
            <p class="home-events__intro">
              {{ t('home.events.intro') }}
            </p>
          </div>
        </div>
      </div>
    </Container>

    <div class="home-events__carousel">
      <div
        ref="trackRef"
        class="home-events__track"
        role="list"
        tabindex="0"
        :aria-label="t('home.events.heading')"
      >
        <div
          v-for="event in events"
          :key="event.id"
          class="home-events__card"
          role="listitem"
        >
          <div class="home-events__media">
            <NuxtImg
              :src="event.image"
              :alt="event.caption"
              class="home-events__img"
              format="webp"
              loading="lazy"
            />
            <div class="home-events__caption-wrap">
              <span
                class="home-events__type-chip"
                :class="`home-events__type-chip--${event.type}`"
              >
                {{ event.typeLabel }}
              </span>
              <p class="home-events__date">
                {{ event.date }}
              </p>
              <p class="home-events__caption">
                {{ event.caption }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="home-events__arrow home-events__arrow--prev"
        :disabled="!canScrollPrev"
        :aria-label="t('home.events.prevLabel')"
        @click="scrollByCard(-1)"
      >
        <Icon name="mdi:chevron-left" />
      </button>
      <button
        type="button"
        class="home-events__arrow home-events__arrow--next"
        :disabled="!canScrollNext"
        :aria-label="t('home.events.nextLabel')"
        @click="scrollByCard(1)"
      >
        <Icon name="mdi:chevron-right" />
      </button>

      <div
        class="home-events__dots"
        role="tablist"
      >
        <button
          v-for="(event, i) in events"
          :key="`dot-${event.id}`"
          type="button"
          class="home-events__dot"
          :class="{ 'home-events__dot--active': i === activeIndex }"
          role="tab"
          :aria-selected="i === activeIndex"
          :aria-label="`${i + 1}`"
          @click="scrollToIndex(i)"
        />
      </div>
    </div>
  </section>
</template>
