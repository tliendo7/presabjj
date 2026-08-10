<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="academy-hero">
    <h1 class="sr-only">
      {{ t('academia.title') }}
    </h1>
    <NuxtPicture
      src="/images/class/presa-academia-brazilian-jiu-jitsu-tenerife.jpg"
      alt=""
      :img-attrs="{ class: 'academy-hero__media' }"
      format="avif,webp"
      sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
      preload
    />
    <span class="academy-hero__badge">{{ t('academia.hero.badge') }}</span>
  </section>
</template>
