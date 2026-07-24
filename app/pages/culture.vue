<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t('culture.title'),
  description: () => t('culture.subtitle')
});
</script>

<template>
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">
      {{ t('culture.title') }}
    </h1>
    <p class="mt-4 text-lg text-gray-600">
      {{ t('culture.subtitle') }}
    </p>
  </section>
</template>
