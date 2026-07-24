<script setup lang="ts">
const { t } = useI18n();

interface ScheduleTab {
  id: string;
  labelKey: string;
  image: string;
  altKey: string;
}

const tabs: ScheduleTab[] = [
  {
    id: 'kids',
    labelKey: 'academia.schedule.tabs.kids',
    image: '/images/horarios/1.jpg',
    altKey: 'academia.schedule.alt.kids'
  },
  {
    id: 'adults',
    labelKey: 'academia.schedule.tabs.adults',
    image: '/images/horarios/IMG_0113.jpg',
    altKey: 'academia.schedule.alt.adults'
  }
];

const activeId = ref<string>('adults');

const activeTab = computed<ScheduleTab>(
  () => tabs.find(tab => tab.id === activeId.value) ?? tabs[0]
);

const selectTab = (id: string): void => {
  activeId.value = id;
};
</script>

<template>
  <section class="academy-schedule">
    <Container>
      <div class="academy-schedule__grid">
        <!-- ── Column 1: heading + intro ── -->
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
        </div>

        <!-- ── Column 2: tabs + image ── -->
        <div class="academy-schedule__content">
          <div
            class="academy-schedule__tabs"
            role="tablist"
            :aria-label="t('academia.schedule.heading')"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              type="button"
              role="tab"
              class="academy-schedule__tab"
              :class="{ 'academy-schedule__tab--active': tab.id === activeId }"
              :aria-selected="tab.id === activeId"
              @click="selectTab(tab.id)"
            >
              {{ t(tab.labelKey) }}
            </button>
          </div>

          <div
            class="academy-schedule__panel"
            role="tabpanel"
          >
            <img
              :key="activeTab.id"
              :src="activeTab.image"
              :alt="t(activeTab.altKey)"
              class="academy-schedule__img"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
