<script setup lang="ts">
const { t, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const route = useRoute();

const isMenuOpen = ref(false);

watch(() => route.fullPath, () => {
  isMenuOpen.value = false;
});
</script>

<template>
  <header class="navbar">
    <nav class="navbar__inner">
      <NuxtLink :to="localePath('/')" class="navbar__logo">
        <img src="/images/logo.png" alt="Presa" class="navbar__logo-img" />
      </NuxtLink>

      <ul class="navbar__links">
        <li>
          <NuxtLink :to="localePath('/')" class="navbar__link">{{ t('nav.home') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/evento')" class="navbar__link">{{ t('nav.evento') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/academia')" class="navbar__link">{{ t('nav.academia') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/culture')" class="navbar__link">{{ t('nav.culture') }}</NuxtLink>
        </li>
      </ul>

      <div class="navbar__locale navbar__locale--desktop">
        <NuxtLink
          :to="switchLocalePath('es')"
          class="navbar__locale-btn"
          :class="{ 'is-active': locale === 'es' }"
          :aria-current="locale === 'es' ? true : undefined"
        >ES</NuxtLink>
        <NuxtLink
          :to="switchLocalePath('en')"
          class="navbar__locale-btn"
          :class="{ 'is-active': locale === 'en' }"
          :aria-current="locale === 'en' ? true : undefined"
        >EN</NuxtLink>
      </div>

      <button
        class="navbar__hamburger"
        :class="{ 'is-open': isMenuOpen }"
        :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </nav>

    <div
      class="navbar__mobile-menu"
      :class="{ 'is-open': isMenuOpen }"
      :aria-hidden="!isMenuOpen"
    >
      <ul class="navbar__mobile-links">
        <li>
          <NuxtLink :to="localePath('/')" class="navbar__mobile-link">{{ t('nav.home') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/evento')" class="navbar__mobile-link">{{ t('nav.evento') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/academia')" class="navbar__mobile-link">{{ t('nav.academia') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/culture')" class="navbar__mobile-link">{{ t('nav.culture') }}</NuxtLink>
        </li>
      </ul>

      <div class="navbar__locale navbar__locale--mobile">
        <NuxtLink
          :to="switchLocalePath('es')"
          class="navbar__locale-btn"
          :class="{ 'is-active': locale === 'es' }"
          :aria-current="locale === 'es' ? true : undefined"
        >ES</NuxtLink>
        <NuxtLink
          :to="switchLocalePath('en')"
          class="navbar__locale-btn"
          :class="{ 'is-active': locale === 'en' }"
          :aria-current="locale === 'en' ? true : undefined"
        >EN</NuxtLink>
      </div>
    </div>
  </header>
</template>
