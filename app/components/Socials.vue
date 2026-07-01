<script setup lang="ts">
interface SocialLink {
  name: string;
  url: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', url: '#' },
  { name: 'YouTube', url: '#' }
];

const CARDS = [
  { id: 1, image: '/images/rrss/rrss-1.jpg', alt: 'Social post 1' },
  { id: 6, image: '/images/rrss/rrss-6.jpg', alt: 'Social post 6' },
  { id: 10, image: '/images/rrss/rrss-10.jpg', alt: 'Social post 10' },
  { id: 4, image: '/images/rrss/rrss-4.jpg', alt: 'Social post 4' },
  { id: 8, image: '/images/rrss/rrss-8.jpg', alt: 'Social post 8' },
  { id: 9, image: '/images/rrss/rrss-9.jpg', alt: 'Social post 9' },
  { id: 3, image: '/images/rrss/rrss-3.jpg', alt: 'Social post 3' }
];

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
    { threshold: 0.2 }
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
          <span class="socials__title-eyebrow">Que es</span>
          <span class="socials__title-main">lo siguiente</span>
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
          <img
            :src="card.image"
            :alt="card.alt"
            class="socials__card-img"
            loading="lazy"
          />
        </div>
      </div>

      <div class="socials__footer">
        <p class="socials__subtitle">Síguenos en redes</p>
        <nav class="socials__links">
          <a
            v-for="social in SOCIAL_LINKS"
            :key="social.name"
            :href="social.url"
            class="socials__link"
          >
            {{ social.name }}
          </a>
        </nav>
      </div>
    </div>
  </section>
</template>
