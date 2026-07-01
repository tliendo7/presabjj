<script setup lang="ts">
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface SpringState {
  current: number;
  velocity: number;
  target: number;
}

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

const images: GalleryImage[] = [
  {
    id: 1,
    src: '/images/past-events/presa-invitational-tournament-1.jpg',
    alt: 'Presa Invitational Tournament - foto 1'
  },
  {
    id: 2,
    src: '/images/past-events/presa-invitational-tournament-2.jpg',
    alt: 'Presa Invitational Tournament - foto 2'
  },
  {
    id: 3,
    src: '/images/past-events/presa-invitational-tournament-3.jpg',
    alt: 'Presa Invitational Tournament - foto 3'
  },
  {
    id: 4,
    src: '/images/past-events/presa-invitational-tournament-4.jpg',
    alt: 'Presa Invitational Tournament - foto 4'
  },
  {
    id: 5,
    src: '/images/past-events/presa-invitational-tournament-5.jpg',
    alt: 'Presa Invitational Tournament - foto 5'
  },
  {
    id: 6,
    src: '/images/past-events/presa-invitational-tournament-6.webp',
    alt: 'Presa Invitational Tournament - foto 6'
  },
  {
    id: 7,
    src: '/images/past-events/presa-invitational-tournament-7.jpg',
    alt: 'Presa Invitational Tournament - foto 7'
  },
  {
    id: 8,
    src: '/images/past-events/presa-invitational-tournament-8.jpg',
    alt: 'Presa Invitational Tournament - foto 8'
  },
  {
    id: 9,
    src: '/images/past-events/presa-invitational-tournament-9.jpg',
    alt: 'Presa Invitational Tournament - foto 9'
  },
  {
    id: 10,
    src: '/images/past-events/presa-invitational-tournament-10.jpg',
    alt: 'Presa Invitational Tournament - foto 10'
  },
  {
    id: 11,
    src: '/images/past-events/presa-invitational-tournament-11.jpg',
    alt: 'Presa Invitational Tournament - foto 11'
  },
  {
    id: 12,
    src: '/images/past-events/presa-invitational-tournament-12.jpg',
    alt: 'Presa Invitational Tournament - foto 12'
  },
  {
    id: 13,
    src: '/images/past-events/presa-invitational-tournament-13.jpg',
    alt: 'Presa Invitational Tournament - foto 13'
  },
  {
    id: 14,
    src: '/images/past-events/presa-invitational-tournament-14.jpg',
    alt: 'Presa Invitational Tournament - foto 14'
  },
  {
    id: 15,
    src: '/images/past-events/presa-invitational-tournament-15.jpg',
    alt: 'Presa Invitational Tournament - foto 15'
  }
];

const imageColumns = computed((): GalleryImage[][] => {
  const cols: GalleryImage[][] = Array.from(
    { length: colCount.value },
    (): GalleryImage[] => []
  );
  images.forEach((img: GalleryImage, i: number) =>
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
        Ediciones anteriores
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
            <img
              :src="image.src"
              :alt="image.alt"
              class="event-gallery__img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
