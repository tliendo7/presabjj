<script setup lang="ts">
interface ScheduleItem {
  time: string;
  name: string;
}

const { t, tm, rt } = useI18n();

const schedule = computed<ScheduleItem[]>(() =>
  (tm('evento.info.schedule') as ScheduleItem[]).map(item => ({
    time: rt(item.time),
    name: rt(item.name)
  }))
);

const categories = computed<string[]>(() =>
  (tm('evento.info.categories') as string[]).map(item => rt(item))
);

const amenities = computed<string[]>(() =>
  (tm('evento.info.amenities') as string[]).map(item => rt(item))
);
</script>

<template>
  <section
    id="informacion-general"
    class="event-info"
  >
    <Container>
      <h2 class="event-info__heading">
        {{ t('evento.info.heading') }}
      </h2>

      <div class="event-info__layout">
        <div class="event-info__about">
          <h3 class="event-info__title">
            {{ t('evento.info.aboutTitle') }}
          </h3>

          <TextLineReveal
            class="event-info__description"
            :text="t('evento.info.description1')"
          />

          <TextLineReveal
            class="event-info__description event-info__description--small"
            :text="t('evento.info.description2')"
          />

          <div class="event-info__schedule">
            <p class="event-info__eyebrow">
              {{ t('evento.info.scheduleEyebrow') }}
            </p>

            <p
              v-for="item in schedule"
              :key="item.name"
              class="event-info__schedule-line"
            >
              <strong>{{ item.time }}</strong> — {{ item.name }}
            </p>
          </div>
        </div>

        <div class="event-info__side">
          <div class="event-info__box">
            <p class="event-info__box-title">
              {{ t('evento.info.detailsTitle') }}
            </p>

            <ul class="event-info__detail-list">
              <li class="event-info__detail-row">
                <span class="event-info__detail-label">{{
                  t('evento.info.detailLocationLabel')
                }}</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Testa+Training+La+Laguna"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="event-info__detail-value event-info__detail-value--link"
                >
                  {{ t('evento.info.detailLocationValue') }}
                </a>
              </li>
              <li class="event-info__detail-row">
                <span class="event-info__detail-label">{{
                  t('evento.info.detailHourLabel')
                }}</span>
                <span class="event-info__detail-value">{{
                  t('evento.info.detailHourValue')
                }}</span>
              </li>
              <li class="event-info__detail-row">
                <span class="event-info__detail-label">{{
                  t('evento.info.detailPrizeLabel')
                }}</span>
                <!-- TODO: conectar con la API de Shopify para calcular el
                     bote a partir de las ventas de merchandising -->
                <span class="event-info__detail-value">{{
                  t('evento.info.detailPrizeValue')
                }}</span>
              </li>
              <li class="event-info__detail-row">
                <span class="event-info__detail-label">{{
                  t('evento.info.detailRefereeingLabel')
                }}</span>
                <span class="event-info__detail-value">
                  {{ t('evento.info.detailRefereeingValue') }}
                </span>
              </li>
              <li class="event-info__detail-row">
                <span class="event-info__detail-label">{{
                  t('evento.info.detailRulesLabel')
                }}</span>
                <span class="event-info__detail-value">
                  {{ t('evento.info.detailRulesValue') }}
                </span>
              </li>
            </ul>
          </div>

          <div class="event-info__box">
            <p class="event-info__box-title">
              {{ t('evento.info.categoriesTitle') }}
            </p>

            <ul class="event-info__chips">
              <li
                v-for="category in categories"
                :key="category"
                class="event-info__chip"
              >
                {{ category }}
              </li>
            </ul>
          </div>

          <div class="event-info__box">
            <p class="event-info__box-title">
              {{ t('evento.info.amenitiesTitle') }}
            </p>

            <ul class="event-info__chips">
              <li
                v-for="amenity in amenities"
                :key="amenity"
                class="event-info__chip"
              >
                {{ amenity }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        id="comprar-entradas"
        class="event-info__outro"
      >
        <NuxtImg
          src="/images/A.png"
          alt="Presa logo mark"
          class="event-info__outro-icon"
          width="80"
          height="64"
          format="webp"
        />

        <p class="event-info__outro-text">
          {{ t('evento.info.outroText') }}
        </p>

        <!-- TODO: sustituir "#" por la URL externa de venta de entradas
             en cuanto el cliente la facilite. -->
        <NuxtLink to="#">
          <Button
            class="event-info__outro-button"
            :label="t('evento.info.outroCta')"
            icon-name="mdi:arrow-right"
            icon-position="right"
            variant="secondary"
          />
        </NuxtLink>
      </div>
    </Container>
  </section>
</template>
