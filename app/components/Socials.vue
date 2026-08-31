<script setup lang="ts">
interface SocialLink {
  id: string;
  handle: string;
  icon: string;
  url: string;
}

const { t } = useI18n();

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram-presabjj',
    handle: '@presabjj',
    icon: 'mdi:instagram',
    url: 'https://www.instagram.com/presabjj/'
  },
  {
    id: 'instagram-presaacademybjj',
    handle: '@presaacademybjj',
    icon: 'mdi:instagram',
    url: 'https://www.instagram.com/presaacademybjj'
  },
  {
    id: 'instagram-santanajiujitsu',
    handle: '@santanajiujitsu',
    icon: 'mdi:instagram',
    url: 'https://www.instagram.com/santanajiujitsu'
  },
  {
    id: 'youtube-presabjj',
    handle: '@PRESABJJ',
    icon: 'mdi:youtube',
    url: 'https://www.youtube.com/@PRESABJJ'
  }
];

const CARD_IMAGES = [
  { id: 1, src: '/images/rrss/rrss-1.jpg' },
  { id: 6, src: '/images/rrss/rrss-6.jpg' },
  { id: 10, src: '/images/rrss/rrss-10.jpg' },
  { id: 4, src: '/images/rrss/rrss-4.jpg' },
  { id: 8, src: '/images/rrss/rrss-8.jpg' },
  { id: 9, src: '/images/past-editions/presa-invitational-tournament-10.jpg' },
  { id: 3, src: '/images/rrss/rrss-3.jpg' }
];

const CARDS = computed(() =>
  CARD_IMAGES.map(({ id, src }) => ({
    id,
    image: src,
    alt: t('socials.cardAlt', { n: id })
  }))
);

const sectionRef = ref<HTMLElement | null>(null);
const isDeployed = ref(false);

let observer: IntersectionObserver | null = null;

const cardDelay = (index: number): string =>
  isDeployed.value ? `${Math.abs(index - 3) * 70}ms` : '0ms';

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting && !isDeployed.value) {
        isDeployed.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0, rootMargin: '0px 0px -40% 0px' }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <section
    ref="sectionRef"
    class="socials"
  >
    <div class="socials__inner">
      <div class="socials__header">
        <h2 class="socials__title">
          <span class="socials__title-eyebrow">{{
            t('socials.titleEyebrow')
          }}</span>
          <span class="socials__title-main">{{ t('socials.titleMain') }}</span>
        </h2>
      </div>

      <div
        class="socials__fan"
        :class="{ 'is-deployed': isDeployed }"
      >
        <div
          v-for="(card, index) in CARDS"
          :key="card.id"
          class="socials__card"
          :class="`socials__card--${index}`"
          :style="{ transitionDelay: cardDelay(index) }"
        >
          <NuxtImg
            :src="card.image"
            :alt="card.alt"
            class="socials__card-img"
            width="600"
            height="800"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>

      <div class="socials__footer">
        <p class="socials__subtitle">
          {{ t('socials.subtitle') }}
        </p>
        <nav class="socials__links">
          <a
            v-for="social in SOCIAL_LINKS"
            :key="social.id"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="socials__link"
          >
            <Icon
              :name="social.icon"
              class="socials__link-icon"
            />
            <span class="socials__link-handle">{{ social.handle }}</span>
          </a>
        </nav>
      </div>
    </div>
  </section>
</template>
