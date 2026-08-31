<script setup lang="ts">
const { tm, rt, t } = useI18n();

interface ValuePoint {
  title: string;
  text: string;
}

const points = computed<ValuePoint[]>(() =>
  (tm('academia.values.points') as ValuePoint[]).map(p => ({
    title: rt(p.title),
    text: rt(p.text)
  }))
);

// Una imagen por item. Si en el futuro se añaden imágenes por punto en el
// i18n, sustituir este array por el dato correspondiente.
const images = [
  '/images/class/_CIR7604.jpg',
  '/images/class/_CIR5205.jpg',
  '/images/past-editions/presa-invitational-tournament-10.jpg',
  '/images/seminars/090526_SBJJ_TaylorPearman-12.jpg'
];

const DURATION = 5000;

const activeIndex = ref(0);
const progressKey = ref(0);

const activeImage = computed(() => images[activeIndex.value % images.length]);

let timer: ReturnType<typeof setTimeout> | null = null;

const clearTimer = (): void => {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
};

const scheduleNext = (): void => {
  clearTimer();
  timer = setTimeout(() => {
    activeIndex.value = (activeIndex.value + 1) % points.value.length;
    progressKey.value++;
    scheduleNext();
  }, DURATION);
};

const setActive = (i: number): void => {
  activeIndex.value = i;
  progressKey.value++;
  scheduleNext();
};

onMounted(() => {
  scheduleNext();
});

onUnmounted(() => {
  clearTimer();
});
</script>

<template>
  <section class="academy-highlights">
    <Container>
      <div class="academy-highlights__grid">
        <ul class="academy-highlights__list">
          <li
            v-for="(point, i) in points"
            :key="point.title"
            class="academy-highlights__item"
            :class="{
              'academy-highlights__item--active': i === activeIndex
            }"
            role="button"
            tabindex="0"
            @click="setActive(i)"
            @keydown.enter="setActive(i)"
            @keydown.space.prevent="setActive(i)"
          >
            <span
              class="academy-highlights__bar"
              aria-hidden="true"
            >
              <span
                v-if="i === activeIndex"
                :key="progressKey"
                class="academy-highlights__bar-fill"
                :style="{ animationDuration: `${DURATION}ms` }"
              />
            </span>

            <div class="academy-highlights__content">
              <h3 class="academy-highlights__title">
                {{ point.title }}
              </h3>
              <div class="academy-highlights__text-wrap">
                <p class="academy-highlights__text">
                  {{ point.text }}
                </p>
              </div>
            </div>
          </li>
        </ul>

        <div class="academy-highlights__media-col">
          <div class="academy-highlights__media">
            <transition name="academy-highlights-fade">
              <NuxtImg
                :key="activeImage"
                :src="activeImage"
                :alt="t('academia.values.imageAlt')"
                class="academy-highlights__img"
                width="700"
                height="400"
                format="webp"
              />
            </transition>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
