<script setup lang="ts">
const { tm, rt, t } = useI18n();

const TYPE_SPEED = 65;
const DELETE_SPEED = 35;
const HOLD_DURATION = 1400;
const LAST_WORD_HOLD_DURATION = 6000;
const PAUSE_BEFORE_TYPE = 300;
const INITIAL_DELAY = 500;

type Phase = 'typing' | 'holding' | 'deleting';

const words = computed<string[]>(() =>
  (tm('academia.video.words') as string[]).map(word => rt(word))
);

const wordIndex = ref(0);
const displayedWord = ref('');
const phase = ref<Phase>('typing');

let timer: ReturnType<typeof setTimeout> | null = null;
let reduceMotionQuery: MediaQueryList | null = null;

const clearTimer = (): void => {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
};

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scheduleTick = (delay: number): void => {
  clearTimer();
  timer = setTimeout(tick, delay);
};

const tick = (): void => {
  const currentWord = words.value[wordIndex.value % words.value.length] ?? '';

  if (phase.value === 'typing') {
    const next = currentWord.slice(0, displayedWord.value.length + 1);
    displayedWord.value = next;

    if (next.length < currentWord.length) {
      scheduleTick(TYPE_SPEED);
    } else {
      phase.value = 'holding';
      const isLastWord = wordIndex.value === words.value.length - 1;
      scheduleTick(isLastWord ? LAST_WORD_HOLD_DURATION : HOLD_DURATION);
    }
    return;
  }

  if (phase.value === 'holding') {
    phase.value = 'deleting';
    scheduleTick(DELETE_SPEED);
    return;
  }

  // deleting
  if (displayedWord.value.length > 0) {
    displayedWord.value = displayedWord.value.slice(0, -1);
    scheduleTick(DELETE_SPEED);
  } else {
    wordIndex.value = (wordIndex.value + 1) % words.value.length;
    phase.value = 'typing';
    scheduleTick(PAUSE_BEFORE_TYPE);
  }
};

const resetAnimation = (): void => {
  clearTimer();
  wordIndex.value = 0;
  displayedWord.value = '';
  phase.value = 'typing';

  if (words.value.length === 0) return;

  if (prefersReducedMotion()) {
    displayedWord.value = words.value[0] ?? '';
    return;
  }

  scheduleTick(INITIAL_DELAY);
};

watch(words, () => resetAnimation());

onMounted(() => {
  resetAnimation();

  if (typeof window !== 'undefined') {
    reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotionQuery.addEventListener('change', resetAnimation);
  }
});

onUnmounted(() => {
  clearTimer();
  reduceMotionQuery?.removeEventListener('change', resetAnimation);
});
</script>

<template>
  <section class="academy-video">
    <video
      class="academy-video__media"
      src="/videos/bjj-tenerife-para-todos.mp4"
      autoplay
      muted
      loop
      playsinline
    />
    <div class="academy-video__overlay" />

    <Container class="academy-video__container">
      <p
        class="academy-video__text"
        aria-hidden="true"
      >
        <span>{{ t('academia.video.fixed') }}</span>
        <span class="academy-video__word">{{ displayedWord }}<span class="academy-video__cursor" /></span>
      </p>

      <p class="sr-only">
        {{ t('academia.video.fixed') }}{{ words.join(', ') }}.
      </p>
    </Container>
  </section>
</template>
