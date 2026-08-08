<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();
const localePath = useLocalePath();

const isNotFound = computed(() => props.error.statusCode === 404);
const copyKey = computed(() => (isNotFound.value ? 'notFound' : 'generic'));

const eyebrow = computed(() => t(`error.${copyKey.value}.eyebrow`));
const heading = computed(() => t(`error.${copyKey.value}.heading`));
const description = computed(() => t(`error.${copyKey.value}.description`));

const goHome = () => clearError({ redirect: localePath('index') });
</script>

<template>
  <div class="error-page">
    <NuxtLink
      :to="localePath('index')"
      class="error-page__logo-link"
      @click="goHome"
    >
      <NuxtImg
        src="/images/logo.png"
        alt="Presa"
        class="error-page__logo"
        format="webp"
      />
    </NuxtLink>

    <p class="error-page__eyebrow">
      {{ eyebrow }}
    </p>

    <h1 class="error-page__heading">
      {{ heading }}
    </h1>

    <p class="error-page__description">
      {{ description }}
    </p>

    <NuxtLink
      :to="localePath('index')"
      class="error-page__cta-link"
      @click="goHome"
    >
      <Button
        :label="t('error.cta')"
        icon-name="mdi:arrow-right"
        icon-position="right"
        variant="primary"
      />
    </NuxtLink>
  </div>
</template>
