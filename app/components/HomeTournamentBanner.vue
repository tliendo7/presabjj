<script setup lang="ts">
// 1. Imports
// (useI18n y useLocalePath se auto-importan en Nuxt)

// 2. TS types or constants

// La fecha del torneo vive también en app/pages/evento.vue (prop
// target-date del <Countdown>). Si cambia la fecha del evento, hay que
// actualizarla en los dos sitios.
const TOURNAMENT_DATE = '2026-11-14T10:00:00Z';

// 5. Composables
const { t } = useI18n();
const localePath = useLocalePath();

// 7. Computed properties
const formattedDate = computed<string>(() =>
  new Date(TOURNAMENT_DATE).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
);
</script>

<template>
  <section class="home-tournament">
    <Container>
      <div class="home-tournament__top">
        <div class="home-tournament__edition-block">
          <span class="home-tournament__edition">
            {{ t('home.tournament.eyebrow') }}
          </span>
        </div>

        <NuxtImg
          src="/images/partners/deporte-lagunero.png"
          :alt="t('home.tournament.sponsorAlt')"
          class="home-tournament__sponsor"
          format="webp"
          loading="lazy"
        />
      </div>

      <div
        class="home-tournament__gallery"
        aria-hidden="true"
      >
        <NuxtImg
          src="/images/deco/mask.png"
          alt=""
          class="home-tournament__photo-img"
          format="webp"
          loading="lazy"
        />
      </div>

      <div class="home-tournament__footer">
        <div class="home-tournament__info">
          <p class="home-tournament__date">
            {{ formattedDate }}
          </p>
          <h2 class="home-tournament__title">
            {{ t('home.tournament.title') }}
          </h2>
        </div>

        <div class="home-tournament__actions">
          <NuxtLink
            to="#"
            class="home-tournament__cta-link"
          >
            <Button
              class="home-tournament__cta-tickets"
              :label="t('home.tournament.ctaTickets')"
              icon-name="mdi:arrow-right"
              icon-position="right"
              variant="outline"
            />
          </NuxtLink>
          <NuxtLink
            :to="localePath('torneo')"
            class="home-tournament__cta-link"
          >
            <Button
              class="home-tournament__cta-info"
              :label="t('home.tournament.ctaInfo')"
              variant="outline"
            />
          </NuxtLink>
        </div>
      </div>
    </Container>
  </section>
</template>
