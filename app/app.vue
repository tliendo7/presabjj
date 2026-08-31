<script setup lang="ts">
// Genera <link rel="alternate" hreflang="es|en" ...> + hreflang="x-default",
// el <link rel="canonical">, y las etiquetas lang/dir del <html>, y las
// og:locale (+ og:locale:alternate) — todo sincronizado con el idioma
// activo. Antes solo se ponía el `lang` del <html> a mano y no había
// hreflang, así que Google podía tratar ES/EN como contenido duplicado.
const i18nHead = useLocaleHead();

// Datos estructurados (schema.org) del negocio: se registran una vez para
// todo el sitio (ver comentario en el propio composable).
useLocalBusinessSchema();

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: [...i18nHead.value.link],
  meta: [...i18nHead.value.meta]
}));
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
