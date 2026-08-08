<script setup lang="ts">
const { t } = useI18n();

const { targetDate } = defineProps<{
  targetDate: string | Date;
}>();

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const timeLeft = ref<TimeLeft>({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
});

const pad = (n: number) => String(n).padStart(2, '0');

let interval: ReturnType<typeof setInterval>;

const calculate = () => {
  const now = Date.now();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    timeLeft.value = { days: '00', hours: '00', minutes: '00', seconds: '00' };
    clearInterval(interval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timeLeft.value = {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds)
  };
};

onMounted(() => {
  calculate();
  interval = setInterval(calculate, 1000);
});

onUnmounted(() => clearInterval(interval));

const formattedDate = computed(() => {
  const d = new Date(targetDate);
  return d
    .toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    .toUpperCase();
});
</script>

<template>
  <section
    class="countdown"
    role="timer"
    :aria-label="`${t('evento.countdown.ariaLabelPrefix')} ${formattedDate}`"
  >
    <div class="countdown__inner">
      <div class="countdown__eyebrow">
        <!-- TODO: fecha hardcodeada temporalmente para la demo con el
        cliente (mismo formato que generaba formattedDate). Volver a usar
        formattedDate cuando se revierta la fecha "trampa" del countdown. -->
        <p class="countdown__label">
          {{ t('evento.countdown.label') }}
        </p>
      </div>

      <div
        class="countdown__digits"
        aria-hidden="true"
      >
        <div class="countdown__item">
          <span class="countdown__number">{{ timeLeft.days }}</span>
          <span class="countdown__unit">{{ t('evento.countdown.dayUnit') }}</span>
        </div>
        <div class="countdown__item">
          <span class="countdown__number">{{ timeLeft.hours }}</span>
          <span class="countdown__unit">{{ t('evento.countdown.hourUnit') }}</span>
        </div>
        <div class="countdown__item">
          <span class="countdown__number">{{ timeLeft.minutes }}</span>
          <span class="countdown__unit">{{ t('evento.countdown.minuteUnit') }}</span>
        </div>
        <div class="countdown__item">
          <span class="countdown__number">{{ timeLeft.seconds }}</span>
          <span class="countdown__unit">{{ t('evento.countdown.secondUnit') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
