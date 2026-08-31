<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section
    class="event-hero"
    :aria-label="t('evento.hero.ariaLabel')"
  >
    <Container>
      <div class="event-hero__inner">
        <h1 class="sr-only">
          {{ t('evento.title') }}
        </h1>
        <NuxtImg
          src="/images/deco/presa-brand-image-dog.png"
          alt="Presa"
          class="event-hero__brand-image"
          width="2400"
          height="989"
          format="webp"
        />

        <div class="event-hero__bottom">
          <picture class="contents">
            <source
              media="(max-width: 767px)"
              srcset="
                /images/deco/presa-invitational-tournament-flyer-mobile.png
              "
            >
            <img
              src="/images/deco/presa-invitational-tournament-flyer.png"
              alt="Presa Invitational Tournament"
              class="event-hero__flyer-image"
            >
          </picture>

          <div class="event-hero__content">
            <div class="event-hero__copy">
              <div class="event-hero__copy-col">
                <p class="event-hero__edition">
                  {{ t('evento.hero.edition') }}
                </p>
                <p class="event-hero__paragraph">
                  {{ t('evento.hero.text1') }}
                </p>
              </div>
              <p class="event-hero__paragraph event-hero__paragraph--secondary">
                {{ t('evento.hero.text2') }}
              </p>
            </div>

            <div class="event-hero__info">
              <!-- TODO: sustituir "#" por la URL externa de venta de
                   entradas en cuanto el cliente la facilite. -->
              <NuxtLink to="#">
                <Button
                  :label="t('evento.hero.cta')"
                  icon-name="mdi:arrow-right"
                  icon-position="right"
                  variant="secondary"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
