<script setup lang="ts">
usePageSeo('home');

// TODO:
// - Galería
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <HomeMarquee />
    <HomeReel />
    <!-- <HomeIntro /> -->
    <HomeAcademy />
    <!-- Torneo pospuesto a 2027: banner oculto temporalmente (no borrar) -->
    <!-- <HomeTournamentBanner /> -->
    <HomeEvents />
    <HomeStore />
    <Socials />
  </div>
</template>
