<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t('academia.title'),
  description: () => t('academia.subtitle')
});
</script>

<template>
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">{{ t('academia.title') }}</h1>
    <p class="mt-4 text-lg text-gray-600">{{ t('academia.subtitle') }}</p>
  </section>
</template>
