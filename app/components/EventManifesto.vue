<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="event-manifesto">
    <Container>
      <div class="event-manifesto__wrapper">
        <p class="event-manifesto__heading">
          <!-- heading1 va siempre en inglés a propósito, en ambos idiomas
               (ver "heading1" en es.json / en.json). -->
          {{ t('evento.manifesto.heading1') }}
          <Icon
            name="mdi:asterisk"
            class="event-manifesto__asterisk"
          />
          {{ t('evento.manifesto.heading2') }}
          <Icon
            name="mdi:asterisk"
            class="event-manifesto__asterisk"
          />
          {{ t('evento.manifesto.heading3') }}
          <Icon
            name="mdi:asterisk"
            class="event-manifesto__asterisk"
          />
          {{ t('evento.manifesto.heading1') }}
          <Icon
            name="mdi:asterisk"
            class="event-manifesto__asterisk"
          />
          {{ t('evento.manifesto.heading2') }}
          <span class="hidden md:inline">
            <Icon
              name="mdi:asterisk"
              class="event-manifesto__asterisk"
            />
            {{ t('evento.manifesto.heading3') }}
            <Icon
              name="mdi:asterisk"
              class="event-manifesto__asterisk"
            />
            {{ t('evento.manifesto.heading1') }}
            <Icon
              name="mdi:asterisk"
              class="event-manifesto__asterisk"
            />
            {{ t('evento.manifesto.heading2') }}
          </span>
          <span class="event-manifesto__last-indent">*</span>
        </p>

        <div class="event-manifesto__columns">
          <p class="event-manifesto__text">
            {{ t('evento.manifesto.text1') }}
          </p>

          <p class="event-manifesto__text">
            {{ t('evento.manifesto.text2') }}
          </p>
        </div>

        <div class="event-manifesto__image-wrap">
          <video
            class="event-manifesto__image"
            src="/videos/2025_reel_resumen.mp4"
            autoplay
            muted
            loop
            playsinline
          />
        </div>
      </div>
    </Container>
  </section>
</template>
