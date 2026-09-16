<script setup lang="ts">
// Sección de vídeo a ancho completo, justo debajo del marquee de la home.
// Mismo criterio que AcademyVideo.vue: autoplay en bucle y silenciado (sin
// pista de audio, recortado con object-cover), sin controles ni texto.
</script>

<template>
  <section class="home-reel">
    <video
      class="home-reel__media"
      src="/videos/reel-sbjj.mp4"
      poster="/videos/posters/reel-sbjj.jpg"
      preload="metadata"
      autoplay
      muted
      loop
      playsinline
    />
  </section>
</template>
