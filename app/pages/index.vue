<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t('home.title'),
  description: () => t('home.subtitle')
});
</script>

<template>
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">
      {{ t('home.title') }}
    </h1>
    <p class="mt-4 text-lg text-gray-600">
      {{ t('home.subtitle') }}
    </p>
  </section>
</template>
