<script setup lang="ts">
const { t } = useI18n();

const whatsappHref = 'https://wa.me/34673645324';
</script>

<template>
  <section
    id="horarios"
    class="academy-schedule"
  >
    <Container>
      <div class="academy-schedule__top">
        <div class="academy-schedule__intro-col">
          <h2 class="academy-schedule__heading">
            {{ t('academia.schedule.heading') }}
          </h2>

          <div class="academy-schedule__intro">
            <span
              class="academy-schedule__intro-square"
              aria-hidden="true"
            />
            <p class="academy-schedule__intro-title">
              {{ t('academia.schedule.intro') }}
            </p>
          </div>

          <div class="academy-schedule__note">
            <p class="academy-schedule__note-lead">
              {{ t('academia.schedule.trial.lead') }}
            </p>
            <p class="academy-schedule__note-text">
              {{ t('academia.schedule.trial.text') }}
            </p>
          </div>

          <a
            :href="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            class="academy-schedule__note-cta-link"
          >
            <Button
              :label="t('academia.schedule.trial.cta')"
              icon-name="mdi:whatsapp"
              icon-position="right"
              variant="outline"
              class="academy-schedule__note-cta"
            />
          </a>
        </div>

        <NuxtImg
          src="/images/schedule.png"
          :alt="t('academia.schedule.imageAlt')"
          class="academy-schedule__reference-img"
          width="1600"
          height="1348"
          format="webp"
          loading="lazy"
        />
      </div>
    </Container>
  </section>
</template>
