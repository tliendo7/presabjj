<script setup lang="ts">
const { t, tm, rt } = useI18n();

// `tm` compiles each string leaf into a message AST node, so every
// entry still needs `rt` to resolve to plain text.
const levels = computed<string[]>(
  () => (tm('academia.schedule.levels') as string[]).map(level => rt(level))
);

const modalities = computed<string[]>(
  () => (tm('academia.schedule.modalities') as string[]).map(modality => rt(modality))
);

// TODO: swap for the real academy WhatsApp number once we have it.
const whatsappHref = 'https://wa.me/34600000000';
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

          <div class="academy-schedule__levels">
            <p class="academy-schedule__levels-heading">
              {{ t('academia.schedule.levelsHeading') }}
            </p>
            <div class="academy-schedule__chips">
              <span
                v-for="level in levels"
                :key="level"
                class="academy-schedule__chip"
              >{{ level }}</span>
            </div>
          </div>

          <div class="academy-schedule__levels">
            <p class="academy-schedule__levels-heading">
              {{ t('academia.schedule.modalitiesHeading') }}
            </p>
            <div class="academy-schedule__chips">
              <span
                v-for="modality in modalities"
                :key="modality"
                class="academy-schedule__chip"
              >{{ modality }}</span>
            </div>
          </div>

          <div class="academy-schedule__note">
            <p class="academy-schedule__note-text">
              <strong>{{ t('academia.schedule.trial.lead') }}</strong> {{ t('academia.schedule.trial.text') }}
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
              icon-name="mdi:arrow-right"
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
          format="webp"
          loading="lazy"
        />
      </div>
    </Container>
  </section>
</template>
