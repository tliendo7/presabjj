<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null);
const pantherY = ref(0);
const circleY = ref(0);
const fightersY = ref(0);

type ParallaxSpeeds = { panther: number; circle: number; fighters: number };

const SPEEDS: Record<'mobile' | 'tablet' | 'desktop', ParallaxSpeeds> = {
  mobile: { panther: 0.2, circle: 0.22, fighters: 0.05 },
  tablet: { panther: 0.25, circle: 0.15, fighters: 0.2 },
  desktop: { panther: 0.4, circle: 0.25, fighters: 0.1 }
};

const getBreakpoint = (): keyof typeof SPEEDS => {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
};

const onScroll = (): void => {
  if (!sectionRef.value) return;
  const rect = sectionRef.value.getBoundingClientRect();
  const offset = -rect.top;
  const { panther, circle, fighters } = SPEEDS[getBreakpoint()];

  pantherY.value = offset * panther;
  circleY.value = offset * circle;
  fightersY.value = offset * fighters;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <section
    ref="sectionRef"
    class="parallax"
    aria-label="Hero parallax"
  >
    <div
      class="parallax__layer parallax__layer--panther"
      :style="{ transform: `translateY(${pantherY}px)` }"
    >
      <img
        src="/images/pantera.png"
        alt=""
        aria-hidden="true"
        class="parallax__panther"
      >
    </div>

    <div
      class="parallax__layer parallax__layer--circle"
      :style="{ transform: `translateY(${circleY}px)` }"
    >
      <div class="parallax__semicircle" />
    </div>

    <div
      class="parallax__layer parallax__layer--fighters"
      :style="{ transform: `translateY(${fightersY}px)` }"
    >
      <img
        src="/images/luchadores.png"
        alt="Luchadores de BJJ"
        class="parallax__fighters"
      >
    </div>
  </section>
</template>
