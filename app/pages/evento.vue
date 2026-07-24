<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t('evento.title'),
  description: () => t('evento.subtitle')
});

interface ScheduleSession {
  name: string;
  date: string;
  time: string;
  isRace?: boolean;
}

// TODO: reemplazar con datos reales del evento
const schedule: ScheduleSession[] = [
  { name: 'Pesaje', date: '3 Oct', time: '10:00h' },
  { name: 'Combates preliminares', date: '3 Oct', time: '12:00h' },
  { name: 'Semifinales', date: '3 Oct', time: '14:30h' },
  { name: 'Finales', date: '3 Oct', time: '16:00h', isRace: true }
];

// TODO LIST

//     · - Footer -> https://www.ymugroup.com/
//     · - Social Media banner
//     · - Parallax animation
//     · - Galería
//     · - Hero
//     · - Animation text reveal block
// - Link comprar entradas
// - Link al livestream

// - Loading page animation

// ** Copys
// ** Traducciones
// ** SEO
// ***** Hand writting animation

// ----> Home page
// ----> Academia
// ----> Culture
// ----> 404
</script>

<template>
  <div class="evento-page">
    <EventHero />

    <Countdown target-date="2026-10-03T16:00:00Z" />
    <EventManifesto />
    <Parallax />

    <EventInfo />
    <Container />

    <Collabs />
    <EventGallery />
    <Socials />
  </div>
</template>
