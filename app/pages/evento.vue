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
  <EventHero />

  <Countdown target-date="2026-10-03T16:00:00Z" />
  <EventManifesto />
  <Parallax />

  <EventInfo />
  <Container>
    <!-- <div class="event-info">
      <div class="event-info__when">
        <span class="event-info__label">Cuando</span>
        <p class="event-info__date-range">16-18</p>
        <p class="event-info__month">OCT</p>
      </div>

      <div class="event-info__stats">
        <div class="event-info__stat">
          <span class="event-info__label">Edición</span>
          <TextLineReveal
            class="event-info__stat-value"
            text="4ª edición"
          />
        </div>
        <div class="event-info__stat">
          <span class="event-info__label">Registro</span>
          <TextLineReveal
            class="event-info__stat-value"
            text="INVITATIONAL"
          />
        </div>
        <div class="event-info__stat">
          <span class="event-info__label">Organizador</span>
          <TextLineReveal
            class="event-info__stat-value"
            text="Presa"
          />
        </div>
        <div class="event-info__stat">
          <span class="event-info__label">Ubicación</span>
          <TextLineReveal
            class="event-info__stat-value"
            text="Testa training"
          />
        </div>
      </div>

      <div class="event-info__center" />

      <div class="event-info__right">
        <div class="event-info__about">
          <span class="event-info__label">Sobre el evento</span>
          <TextLineReveal
            class="event-hero__description"
            text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit quos nostrum ullam? Explicabo assumenda exercitationem veritatis hic accusantium quae nostrum ipsa a dignissimos."
          />
        </div>

        <div class="event-info__schedule">
          <span class="event-info__label">Horario</span>
          <table
            class="event-info__table"
            aria-label="Horario del evento"
          >
            <thead class="sr-only">
              <tr>
                <th scope="col">Sesión</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="session in schedule"
                :key="session.name"
                :class="[
                  'event-info__row',
                  { 'event-info__row--race': session.isRace }
                ]"
              >
                <td class="event-info__cell event-info__cell--name">
                  {{ session.name }}
                </td>
                <td class="event-info__cell event-info__cell--date">
                  {{ session.date }}
                </td>
                <td class="event-info__cell event-info__cell--time">
                  {{ session.time }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> -->
  </Container>

  <Collabs />
  <EventGallery />
  <Socials />
</template>
