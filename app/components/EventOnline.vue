<script setup lang="ts">
interface VideoCard {
  id: string;
  title: string;
  badge?: string;
  image?: string;
  duration?: string;
  url: string | null;
  live?: boolean;
}

const { t } = useI18n();

const PAST_EDITION_VIDEO_URL = 'https://www.youtube.com/live/2V9duCd7uyk';

// TODO: sustituir por el link real de la retransmisión en directo el día
// del evento (14 nov 2026).
const LIVE_EVENT_URL = 'https://www.youtube.com/@PRESABJJ';

// TODO: sustituir por la imagen/flyer definitivo del Tournament 2026
// cuando esté disponible.
const LIVE_EVENT_IMAGE = '/images/deco/bg-2.jpg';

// Fecha real del evento (ver TODO equivalente en evento.vue sobre la
// fecha "trampa" del countdown para la demo con el cliente).
const EVENT_START_DATE = new Date('2026-11-14T10:00:00Z');

const pastEditionCard = computed<VideoCard>(() => ({
  id: 'past-edition',
  title: 'Tournament 2025',
  badge: t('evento.online.pastEditionBadge'),
  image: '/images/deco/flyer-2025.jpg',
  duration: '3h 11m',
  url: PAST_EDITION_VIDEO_URL
}));

const comingSoonCard = computed<VideoCard>(() => ({
  id: 'next-edition-soon',
  title: 'Tournament 2026',
  badge: t('evento.online.comingSoonBadge'),
  url: null
}));

// Card lista para el día del evento: en cuanto isEventLive sea true,
// sustituye automáticamente a la card "Próximamente" por el enlace
// directo a la retransmisión de YouTube.
const liveCard: VideoCard = {
  id: 'next-edition-live',
  title: 'Tournament 2026',
  image: LIVE_EVENT_IMAGE,
  url: LIVE_EVENT_URL,
  live: true
};

const isEventLive = ref(false);

onMounted(() => {
  isEventLive.value = new Date() >= EVENT_START_DATE;
});

const secondCard = computed(
  (): VideoCard => (isEventLive.value ? liveCard : comingSoonCard.value)
);

const cards = computed((): VideoCard[] => [pastEditionCard.value, secondCard.value]);
</script>

<template>
  <section class="event-online">
    <Container>
      <div class="event-online__layout">
        <div class="event-online__map">
          <img
            src="/images/planet.png"
            alt=""
            class="event-online__map-img"
          />
        </div>

        <div class="event-online__content">
          <div class="event-online__title-block">
            <h2 class="event-online__title-main">
              <span class="event-online__title-line">{{ t('evento.online.titleLine1') }}</span>
              <span
                class="event-online__title-line event-online__title-line--brier"
              >
                {{ t('evento.online.titleLine2') }}
              </span>
            </h2>

            <TextLineReveal
              class="event-online__meta"
              :text="t('evento.online.description')"
            />
          </div>

          <div class="event-online__cards">
            <component
              :is="card.url ? 'a' : 'div'"
              v-for="card in cards"
              :key="card.id"
              :href="card.url ?? undefined"
              :target="card.url ? '_blank' : undefined"
              :rel="card.url ? 'noopener noreferrer' : undefined"
              class="event-online__card"
              :class="{ 'event-online__card--disabled': !card.url }"
            >
              <template v-if="card.url">
                <img
                  :src="card.image"
                  :alt="card.title"
                  class="event-online__card-img"
                  loading="lazy"
                />
                <div class="event-online__card-overlay" />

                <span
                  v-if="card.live"
                  class="event-online__live-chip"
                >
                  <span class="event-online__live-dot" />
                  {{ t('evento.online.liveLabel') }}
                </span>

                <span
                  v-if="card.badge"
                  class="event-online__card-badge"
                  >{{ card.badge }}</span
                >

                <span
                  v-if="card.duration"
                  class="event-online__card-duration"
                  >{{ card.duration }}</span
                >

                <Icon
                  name="mdi:youtube"
                  class="event-online__card-play"
                />

                <p class="event-online__card-title">
                  {{ card.title }}
                </p>
              </template>

              <template v-else>
                <span class="event-online__card-badge">{{ card.badge }}</span>
                <p class="event-online__card-title">
                  {{ card.title }}
                </p>
              </template>
            </component>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
