<script setup lang="ts">
const { t, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const route = useRoute();

const isMenuOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  }
);
</script>

<template>
  <header class="navbar">
    <nav class="navbar__inner">
      <NuxtLink
        :to="localePath('index')"
        class="navbar__logo"
      >
        <NuxtImg
          src="/images/logo.png"
          alt="Presa"
          class="navbar__logo-img"
          width="234"
          height="64"
          format="webp"
        />
      </NuxtLink>

      <ul class="navbar__links">
        <li>
          <NuxtLink
            :to="localePath('index')"
            class="navbar__link"
          >
            {{ t('nav.home') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="localePath('academia')"
            class="navbar__link"
          >
            {{ t('nav.academia') }}
          </NuxtLink>
        </li>
        <!-- Torneo pospuesto a 2027: enlace oculto temporalmente (no borrar) -->
        <!--
        <li>
          <NuxtLink
            :to="localePath('torneo')"
            class="navbar__link"
          >
            {{ t('nav.evento') }}
          </NuxtLink>
        </li>
        -->
        <li>
          <NuxtLink
            :to="localePath('contacto')"
            class="navbar__link"
          >
            {{ t('nav.contacto') }}
          </NuxtLink>
        </li>
      </ul>

      <div class="navbar__locale navbar__locale--desktop">
        <NuxtLink
          :to="switchLocalePath('es')"
          class="navbar__locale-btn"
          :class="{ 'is-active': locale === 'es' }"
          :aria-current="locale === 'es' ? true : undefined"
        >
          ES
        </NuxtLink>
        <span
          class="navbar__locale-separator"
          aria-hidden="true"
        >
          |
        </span>
        <NuxtLink
          :to="switchLocalePath('en')"
          class="navbar__locale-btn"
          :class="{ 'is-active': locale === 'en' }"
          :aria-current="locale === 'en' ? true : undefined"
        >
          EN
        </NuxtLink>
      </div>

      <button
        class="navbar__hamburger"
        :class="{ 'is-open': isMenuOpen }"
        :aria-label="isMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </nav>

    <div
      class="navbar__mobile-menu"
      :class="{ 'is-open': isMenuOpen }"
      :aria-hidden="!isMenuOpen"
    >
      <ul class="navbar__mobile-links">
        <li>
          <NuxtLink
            :to="localePath('index')"
            class="navbar__mobile-link"
          >
            {{ t('nav.home') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="localePath('academia')"
            class="navbar__mobile-link"
          >
            {{ t('nav.academia') }}
          </NuxtLink>
        </li>
        <!-- Torneo pospuesto a 2027: enlace oculto temporalmente (no borrar) -->
        <!--
        <li>
          <NuxtLink
            :to="localePath('torneo')"
            class="navbar__mobile-link"
          >
            {{ t('nav.evento') }}
          </NuxtLink>
        </li>
        -->
        <li>
          <NuxtLink
            :to="localePath('contacto')"
            class="navbar__mobile-link"
          >
            {{ t('nav.contacto') }}
          </NuxtLink>
        </li>
      </ul>

      <div class="navbar__locale navbar__locale--mobile">
        <NuxtLink
          :to="switchLocalePath('es')"
          class="navbar__locale-btn"
          :class="{ 'is-active': locale === 'es' }"
          :aria-current="locale === 'es' ? true : undefined"
        >
          ES
        </NuxtLink>
        <span
          class="navbar__locale-separator"
          aria-hidden="true"
        >
          |
        </span>
        <NuxtLink
          :to="switchLocalePath('en')"
          class="navbar__locale-btn"
          :class="{ 'is-active': locale === 'en' }"
          :aria-current="locale === 'en' ? true : undefined"
        >
          EN
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
