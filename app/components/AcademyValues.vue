<script setup lang="ts">
const { tm, rt, t } = useI18n();

interface ValuePoint {
  title: string;
  text: string;
}

const imageAlt = computed(() => t('academia.values.imageAlt'));
const points = computed<ValuePoint[]>(() =>
  (tm('academia.values.points') as ValuePoint[]).map(p => ({
    title: rt(p.title),
    text: rt(p.text)
  }))
);

const MIN_TOP = 24;

const mediaRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

let itemEls: HTMLElement[] = [];
let isDesktop = false;
let stickyTop = 0;
let ticking = false;
let rafId: number | null = null;

const isDesktopView = (): boolean =>
  window.matchMedia('(min-width: 1024px)').matches;

const computeLayout = (): void => {
  isDesktop = isDesktopView();
  if (!mediaRef.value) return;
  if (isDesktop) {
    const imgHeight = mediaRef.value.getBoundingClientRect().height;
    stickyTop = Math.max(MIN_TOP, (window.innerHeight - imgHeight) / 2);
    mediaRef.value.style.top = `${stickyTop}px`;
  } else {
    mediaRef.value.style.top = '';
  }
};

const update = (): void => {
  ticking = false;
  if (!itemEls.length) return;

  if (isDesktop && mediaRef.value?.parentElement) {
    const colRect = mediaRef.value.parentElement.getBoundingClientRect();
    const imgHeight = mediaRef.value.getBoundingClientRect().height;
    const span = colRect.height - imgHeight;
    let progress = span > 0 ? (stickyTop - colRect.top) / span : 0;
    progress = Math.max(0, Math.min(1, progress));
    activeIndex.value = Math.min(
      itemEls.length - 1,
      Math.floor(progress * itemEls.length)
    );
    return;
  }

  const threshold = window.innerHeight / 2;
  let active = 0;
  itemEls.forEach((el, i) => {
    if (el.getBoundingClientRect().top <= threshold) active = i;
  });
  activeIndex.value = active;
};

const onScroll = (): void => {
  if (!ticking) {
    ticking = true;
    rafId = requestAnimationFrame(update);
  }
};

const onResize = (): void => {
  computeLayout();
  update();
};

onMounted(() => {
  const root = mediaRef.value?.closest('.academy-values');
  itemEls = root
    ? Array.from(root.querySelectorAll<HTMLElement>('.academy-values__item'))
    : [];
  computeLayout();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  update();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <section class="academy-values">
    <Container>
      <div class="academy-values__grid">
        <div class="academy-values__media-col">
          <div
            ref="mediaRef"
            class="academy-values__media"
          >
            <img
              src="/images/__dummy/_CIR7604.jpg"
              :alt="imageAlt"
              class="academy-values__img"
            >
          </div>
        </div>

        <ul class="academy-values__list">
          <li
            v-for="(point, i) in points"
            :key="point.title"
            class="academy-values__item"
            :class="{ 'academy-values__item--active': i === activeIndex }"
          >
            <span
              class="academy-values__item-square"
              aria-hidden="true"
            />
            <p class="academy-values__item-text">
              <span class="academy-values__item-title">{{ point.title }}</span>
              {{ point.text }}
            </p>
          </li>
        </ul>
      </div>
    </Container>
  </section>
</template>
