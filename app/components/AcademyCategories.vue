<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

interface CategoryCta {
  href: string;
}

interface CategoryStat {
  label?: string;
  value?: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  items?: string[];
}

interface Category {
  title: string;
  description: string;
  more: string;
  image: string;
  imagePosition?: string;
  cta: CategoryCta;
  stats: CategoryStat[];
}

const { tm, rt, t } = useI18n();

const stackRef = ref<HTMLElement | null>(null);
const openIndex = ref<number | null>(null);
const animatedValues = ref<number[][]>([]);

let wrapperEls: HTMLElement[] = [];
let statsObserver: IntersectionObserver | null = null;
let reduced = false;
let ticking = false;
let rafId: number | null = null;
const statsRafIds: (number | null)[] = [];

const MIN_SCALE = 0.58;
const MIN_OPACITY = 0.1;
const STATS_DURATION = 1500;

const categories = computed<Category[]>(() =>
  (tm('academia.categories.cards') as Category[]).map(card => ({
    title: rt(card.title),
    description: rt(card.description),
    more: rt(card.more),
    image: rt(card.image),
    imagePosition: card.imagePosition ? rt(card.imagePosition) : 'center',
    cta: { href: rt(card.cta.href) },
    stats: (card.stats ?? []).map(stat =>
      stat.items
        ? { items: stat.items.map(item => rt(item)) }
        : {
            label: rt(stat.label ?? ''),
            value: stat.value ?? 0,
            from: stat.from ?? 0,
            prefix: stat.prefix ? rt(stat.prefix) : '',
            suffix: stat.suffix ? rt(stat.suffix) : ''
          }
    )
  }))
);

watch(
  categories,
  cats => {
    animatedValues.value = cats.map(cat =>
      cat.stats.map(stat => stat.from ?? 0)
    );
  },
  { immediate: true }
);

const formatStat = (cardIndex: number, statIndex: number): string => {
  const cat = categories.value[cardIndex];
  const stat = cat?.stats[statIndex];
  if (!stat) return '';
  const current =
    animatedValues.value[cardIndex]?.[statIndex] ?? stat.from ?? 0;
  return `${stat.prefix ?? ''}${Math.round(current)}${stat.suffix ?? ''}`;
};

const animateCardStats = (cardIndex: number): void => {
  const cat = categories.value[cardIndex];
  if (!cat || !cat.stats.length) return;

  const pendingId = statsRafIds[cardIndex];
  if (pendingId !== null && pendingId !== undefined) {
    cancelAnimationFrame(pendingId);
    statsRafIds[cardIndex] = null;
  }

  if (reduced) {
    animatedValues.value[cardIndex] = cat.stats.map(stat => stat.value ?? 0);
    return;
  }

  const startValues = cat.stats.map(stat => stat.from ?? 0);
  const endValues = cat.stats.map(stat => stat.value ?? 0);
  animatedValues.value[cardIndex] = [...startValues];
  const startTime = performance.now();

  const step = (now: number): void => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / STATS_DURATION);
    const eased = 1 - Math.pow(1 - progress, 3);

    animatedValues.value[cardIndex] = startValues.map(
      (start, i) => start + (endValues[i] - start) * eased
    );

    statsRafIds[cardIndex] = progress < 1 ? requestAnimationFrame(step) : null;
  };

  statsRafIds[cardIndex] = requestAnimationFrame(step);
};

const disclosureLabel = (cardIndex: number): string =>
  openIndex.value === cardIndex
    ? t('academia.categories.lessLabel')
    : t('academia.categories.moreLabel');

const toggle = (index: number): void => {
  openIndex.value = openIndex.value === index ? null : index;
};

const update = (): void => {
  ticking = false;
  if (!wrapperEls.length) return;

  if (reduced) {
    wrapperEls.forEach(el => {
      el.style.transform = '';
      el.style.opacity = '';
    });
    return;
  }

  wrapperEls.forEach((el, i) => {
    const next = wrapperEls[i + 1];
    if (!next) {
      el.style.transform = 'scale(1)';
      el.style.opacity = '1';
      return;
    }

    const cardHeight = el.offsetHeight || 1;
    const nextTop = next.getBoundingClientRect().top;
    let progress = 1 - nextTop / cardHeight;
    progress = Math.max(0, Math.min(1, progress));

    const scale = 1 - progress * (1 - MIN_SCALE);
    const opacity = 1 - progress * (1 - MIN_OPACITY);
    el.style.transform = `scale(${scale.toFixed(4)})`;
    el.style.opacity = opacity.toFixed(3);
  });
};

const onScroll = (): void => {
  if (!ticking) {
    ticking = true;
    rafId = requestAnimationFrame(update);
  }
};

const onResize = (): void => update();

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  wrapperEls = stackRef.value
    ? Array.from(
        stackRef.value.querySelectorAll<HTMLElement>(
          '.academy-categories__wrapper'
        )
      )
    : [];
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  update();

  const statEls = stackRef.value
    ? Array.from(
        stackRef.value.querySelectorAll<HTMLElement>(
          '.academy-categories__stats'
        )
      )
    : [];

  statsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const cardIndex = Number(
          (entry.target as HTMLElement).dataset.cardIndex
        );
        animateCardStats(cardIndex);
      });
    },
    { threshold: 0.4 }
  );
  statEls.forEach(el => statsObserver?.observe(el));
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
  if (rafId !== null) cancelAnimationFrame(rafId);
  statsRafIds.forEach(id => {
    if (id !== null) cancelAnimationFrame(id);
  });
  statsObserver?.disconnect();
});
</script>

<template>
  <section class="academy-categories">
    <Container>
      <div
        ref="stackRef"
        class="academy-categories__stack"
      >
        <article
          v-for="(category, cardIndex) in categories"
          :key="category.title"
          class="academy-categories__wrapper"
        >
          <div class="academy-categories__card">
            <!-- ── Info column (left on desktop, below on mobile) ── -->
            <div class="academy-categories__info">
              <h3 class="academy-categories__title">
                {{ category.title }}
              </h3>
              <p class="academy-categories__desc">
                {{ category.description }}
              </p>

              <!-- ── Disclosure: click the arrow to reveal more info ── -->
              <button
                type="button"
                class="academy-categories__disclosure"
                :class="{ 'is-open': openIndex === cardIndex }"
                :aria-expanded="openIndex === cardIndex"
                :aria-controls="`academy-more-${cardIndex}`"
                @click="toggle(cardIndex)"
              >
                <span class="academy-categories__disclosure-label">
                  {{ disclosureLabel(cardIndex) }}
                </span>
                <svg
                  class="academy-categories__disclosure-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                    fill="black"
                  />
                  <path
                    d="M8.5 8.5L15.5 15.5M15.5 8.5V15.5H8.5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <div
                :id="`academy-more-${cardIndex}`"
                class="academy-categories__more"
                :class="{ 'is-open': openIndex === cardIndex }"
                role="region"
              >
                <div class="academy-categories__more-inner">
                  <p class="academy-categories__more-text">
                    {{ category.more }}
                  </p>
                </div>
              </div>

              <div
                v-if="category.stats.length"
                class="academy-categories__stats"
                :data-card-index="cardIndex"
              >
                <div
                  v-for="(stat, statIndex) in category.stats"
                  :key="stat.items ? stat.items.join('|') : stat.label"
                  class="academy-categories__stat"
                  :class="{
                    'academy-categories__stat--list': stat.items
                  }"
                >
                  <template v-if="stat.items">
                    <span
                      v-for="item in stat.items"
                      :key="item"
                      class="academy-categories__stat-label"
                    >
                      {{ item }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="academy-categories__stat-label">
                      {{ stat.label }}
                    </span>
                    <span class="academy-categories__stat-value">
                      {{ formatStat(cardIndex, statIndex) }}
                    </span>
                  </template>
                </div>
              </div>
            </div>

            <!-- ── Media column (right on desktop, top on mobile) ── -->
            <div class="academy-categories__media">
              <img
                :src="category.image"
                :alt="category.title"
                class="academy-categories__img"
                :style="{ objectPosition: category.imagePosition }"
                loading="lazy"
              />
            </div>
          </div>
        </article>
      </div>
    </Container>
  </section>
</template>
