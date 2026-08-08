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
        <img
          src="/images/deco/logo-white.png"
          alt="Presa"
          class="home-hero__logo"
        >
        <h1 class="home-hero__text">
          {{ t('home.subtitle') }}
        </h1>
      </div>
    </Container>
  </section>
</template>
