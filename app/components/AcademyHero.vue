<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="academy-hero">
    <h1 class="sr-only">
      {{ t('academia.title') }}
    </h1>
    <img
      class="academy-hero__media"
      src="/images/class/presa-academia-brazilian-jiu-jitsu-tenerife.jpg"
      alt=""
    >
  </section>
</template>
