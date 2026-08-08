<script setup lang="ts">
const { locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: () => locale.value
  }
});
</script>

<template>
  <NuxtLoadingIndicator color="var(--presa-red)" />
  <NuxtRouteAnnouncer />
  <Navbar />
  <main>
    <NuxtPage />
  </main>
  <Footer />
</template>
