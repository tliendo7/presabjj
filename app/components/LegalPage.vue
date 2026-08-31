<script setup lang="ts">
// TODO: falta rellenar los datos identificativos reales de la sociedad
// en i18n/locales/es.json y en.json (claves avisoLegal.sections y
// privacidad.sections) — ahora mismo llevan los placeholders
// [NOMBRE COMPLETO O RAZÓN SOCIAL], [NIF/CIF] y [DOMICILIO COMPLETO].
// No publicar el Aviso Legal / Política de Privacidad hasta sustituirlos.

interface Props {
  i18nKey: string;
}

const { i18nKey } = defineProps<Props>();

const { t, tm, rt } = useI18n();

interface LegalSection {
  heading: string;
  body: string;
}

const sections = computed<LegalSection[]>(() =>
  (tm(`${i18nKey}.sections`) as LegalSection[]).map(section => ({
    heading: rt(section.heading),
    body: rt(section.body)
  }))
);
</script>

<template>
  <section class="legal-page">
    <Container>
      <h1 class="legal-page__heading">
        {{ t(`${i18nKey}.heading`) }}
      </h1>

      <div class="legal-page__body">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="legal-page__section"
        >
          <h2 class="legal-page__section-heading">
            {{ section.heading }}
          </h2>
          <p class="legal-page__section-body">
            {{ section.body }}
          </p>
        </div>
      </div>
    </Container>
  </section>
</template>
