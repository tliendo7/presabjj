<script setup lang="ts">
usePageSeo('evento');

// TODO LIST

//        x - Footer -> https://www.ymugroup.com/
//        x - Social Media banner
//        x - Parallax animation
//        x - Galería
//        x - Hero
//        x - Animation text reveal block
//        x - Merchandising
//        x - Remontar la parte de info
//        x - Fotos merch
//    - 💘 Ponerlo bonito 💘
// - Link al livestream

// - Copys
// - Traducciones
// ***** Hand writting animation
</script>

<template>
  <div class="torneo-page">
    <EventHero />

    <Countdown target-date="2026-11-14T18:00:00Z" />
    <EventManifesto />

    <EventInfo />
    <Merchandising />
    <Container />

    <Collabs />
    <EventOnline />
    <EventGallery />
    <Socials />
  </div>
</template>
