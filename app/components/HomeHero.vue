<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section
    class="home-hero"
    :aria-label="t('home.hero.ariaLabel')"
  >
    <Container>
      <div class="home-hero__inner">
        <NuxtImg
          src="/images/deco/logo-white.png"
          alt="Presa"
          class="home-hero__logo"
          width="480"
          height="120"
          format="webp"
        />
        <h1 class="home-hero__text">
          {{ t('home.subtitle') }}
        </h1>
      </div>
    </Container>
  </section>
</template>
