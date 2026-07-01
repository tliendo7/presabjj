<script setup lang="ts">
interface ScheduleItem {
  day: string;
  time: string;
  name: string;
  highlight?: boolean;
}

// TODO: reemplazar con datos reales del evento
const schedule: ScheduleItem[] = [
  { day: 'Vie 16', time: '18h', name: 'Publicación de las categorías' },
  { day: 'Sáb 17', time: '16h', name: 'Inauguración del evento' },
  { day: 'Sáb 17', time: '16.30h', name: 'Primer pase' },
  { day: 'Sáb 17', time: '17h', name: 'Descanso' },
  { day: 'Sáb 17', time: '17.30h', name: 'Segundo pase' },
  { day: 'Sáb 17', time: '20h', name: 'Podio & Premios', highlight: true }
];
</script>

<template>
  <section class="event-info">
    <Container>
      <h2 class="event-info__heading">Todos los detalles</h2>

      <div class="event-info__layout">
        <div class="event-info__card">
          <div class="event-info__section event-info__about">
            <h2 class="event-info__title">Sobre el evento</h2>
            <TextLineReveal
              class="event-info__description"
              text="Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, voluptatem consectetur iusto ducimus rem quam aut
              officiis aperiam est eaque beatae vero nisi necessitatibus culpa
              sint animi! Sint, quidem ea!"
            />

            <ul class="event-info__meta">
              <li class="event-info__meta-item">
                <Icon
                  name="mdi:map-marker"
                  class="event-info__meta-icon"
                />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Testa+Training+La+Laguna"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="event-info__meta-link"
                >
                  Testa Training
                </a>
              </li>
              <li class="event-info__meta-item">
                <Icon
                  name="mdi:clock-outline"
                  class="event-info__meta-icon"
                />
                <span>16.00h</span>
              </li>
            </ul>
          </div>

          <div class="event-info__section event-info__prize">
            <p class="event-info__title">Premio · Bote acumulado</p>
            <TextLineReveal
              class="event-info__description"
              text="La bolsa de premios crece con cada artículo de merchandising que
              venden los competidores. Cuanto más mueve el cartel, mayor el
              premio que se reparten al final."
            />
          </div>

          <Button
            class="event-info__button"
            label="Compra tu entrada"
            icon-name="mdi:arrow-right"
            icon-position="right"
            variant="secondary"
          />
        </div>
        <div class="event-info__side">
          <div class="event-info__section event-info__categories">
            <p class="event-info__title">Categorias & Divisiones</p>
            <ul class="event-info__chips">
              <li class="event-info__chip">Femenino</li>
              <li class="event-info__chip">Masculino</li>
              <li class="event-info__chip">Junior</li>
              <li class="event-info__chip">Senior</li>
              <li class="event-info__chip">Master</li>
              <li class="event-info__chip">Open</li>
              <li class="event-info__chip">No-Gi</li>
              <li class="event-info__chip">Gi</li>
              <li class="event-info__chip">No-Gi</li>
            </ul>
          </div>

          <div class="event-info__section event-info__rules">
            <p class="event-info__title">Modalidad & Reglas</p>
            <p class="event-info__description">Sólo sumisión, sin puntos.</p>
          </div>
          <div class="event-info__section event-info__schedule">
            <div class="event-info__section-header">
              <p class="event-info__title">Horario</p>
              <p class="event-info__note">*Hora canaria</p>
            </div>
            <ul class="event-info__schedule-list">
              <li
                v-for="item in schedule"
                :key="item.name"
                class="event-info__schedule-row"
                :class="{
                  'event-info__schedule-row--highlight': item.highlight
                }"
              >
                <span class="event-info__schedule-time">
                  {{ item.day }} · {{ item.time }}
                </span>
                <span class="event-info__schedule-name">{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
