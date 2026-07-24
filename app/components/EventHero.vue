<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null);
const imageY = ref(0);

const SPEEDS: Record<'mobile' | 'tablet' | 'desktop', number> = {
  mobile: 0.1,
  tablet: 0.15,
  desktop: 0.22
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
  imageY.value = offset * SPEEDS[getBreakpoint()];
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
    class="event-hero"
    aria-label="Hero del evento"
  >
    <Container class="event-hero__container">
      <div class="event-hero__text">
        <a
          href="#livestream"
          class="event-hero__online"
        >
          <div class="event-hero__online-wave-outer">
            <div class="event-hero__online-wave-inner">
              <div class="event-hero__online-cover">
                <Icon
                  name="mdi:play"
                  class="event-hero__online-play"
                />
              </div>
            </div>
          </div>
        </a>

        <h1 class="event-hero__title">
          <strong class="event-hero__eyebrow">4ª edición</strong>
          <span class="event-hero__title-line">Presa</span>
          <em class="event-hero__title-line event-hero__title-line--serif">
            International
          </em>
          <span class="event-hero__title-line">Tournament</span>
        </h1>

        <div class="event-hero__date">
          <span class="event-hero__date-day">03</span>
          <span class="event-hero__date-month-year">
            <span class="event-hero__date-month">Octubre</span>
            <span class="event-hero__date-year">2026</span>
          </span>
        </div>
        <TextLineReveal
          class="event-hero__description"
          text="Volvemos a por todo, la cuarta edición ya está aquí. Competidores de BJJ nacionales e internacionales se suben al tatami de nuevo."
        />
        <Button
          label="Compra tu entrada"
          icon-name="mdi:arrow-right"
          icon-position="right"
        />
      </div>
    </Container>

    <div
      class="event-hero__image-wrap"
      :style="{ transform: `translateY(${imageY}px)` }"
      aria-hidden="true"
    >
      <img
        src="/images/luchadores.png"
        alt=""
        class="event-hero__image"
      >
    </div>
  </section>
</template>
