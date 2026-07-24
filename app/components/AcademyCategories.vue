<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface CategoryCta {
  href: string;
}

interface Category {
  title: string;
  description: string;
  more: string;
  image: string;
  cta: CategoryCta;
}

const { tm, rt, t } = useI18n();

const stackRef = ref<HTMLElement | null>(null);
const openIndex = ref<number | null>(null);

let wrapperEls: HTMLElement[] = [];
let reduced = false;
let ticking = false;
let rafId: number | null = null;

const MIN_SCALE = 0.58;
const MIN_OPACITY = 0.1;

const categories = computed<Category[]>(() =>
  (tm('academia.categories.cards') as Category[]).map(card => ({
    title: rt(card.title),
    description: rt(card.description),
    more: rt(card.more),
    image: rt(card.image),
    cta: { href: rt(card.cta.href) }
  }))
);

const moreLabel = computed<string>(() => t('academia.categories.moreLabel'));

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
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <section class="academy-categories">
    <Container>
      <h2 class="academy-categories__heading">
        {{ t('academia.categories.heading') }}
      </h2>

      <div class="academy-categories__intro">
        <div class="academy-categories__intro-col">
          <span
            class="academy-categories__intro-square"
            aria-hidden="true"
          />
          <h3 class="academy-categories__intro-title">
            {{ t('academia.categories.intro') }}
          </h3>
        </div>
        <div
          class="academy-categories__intro-col academy-categories__intro-col--empty"
          aria-hidden="true"
        />
      </div>

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
                  {{ moreLabel }}
                </span>
                <svg
                  class="academy-categories__disclosure-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    stroke-width="2"
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
            </div>

            <!-- ── Media column (right on desktop, top on mobile) ── -->
            <div class="academy-categories__media">
              <img
                :src="category.image"
                :alt="category.title"
                class="academy-categories__img"
                loading="lazy"
              >
            </div>
          </div>
        </article>
      </div>
    </Container>
  </section>
</template>
