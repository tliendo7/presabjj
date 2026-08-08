<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

interface ContactInfo {
  id: string;
  icon: string;
  value: string;
  href?: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const { t } = useI18n();

const asideImage = '/images/class/291025_PASJ-48.jpg';

const contactInfo = computed<ContactInfo[]>(() => [
  {
    id: 'email',
    icon: 'mdi:email-outline',
    value: t('academia.form.contact.email'),
    href: `mailto:${t('academia.form.contact.email')}`
  },
  {
    id: 'phone',
    icon: 'mdi:phone-outline',
    value: t('academia.form.contact.phone'),
    href: `tel:${t('academia.form.contact.phoneHref')}`
  },
  {
    id: 'location',
    icon: 'mdi:map-marker-outline',
    value: t('academia.form.contact.location')
  }
]);

const form = reactive<FormState>({
  name: '',
  phone: '',
  email: '',
  message: '',
  consent: false
});

const status = ref<SubmitStatus>('idle');

const isValid = computed<boolean>(() =>
  Boolean(
    form.name.trim() &&
    form.phone.trim() &&
    form.email.trim() &&
    form.message.trim() &&
    form.consent
  )
);

const resetForm = (): void => {
  form.name = '';
  form.phone = '';
  form.email = '';
  form.message = '';
  form.consent = false;
};

const onPhoneInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const digitsOnly = target.value.replace(/\D/g, '');
  form.phone = digitsOnly;
  target.value = digitsOnly;
};

const submitForm = async (): Promise<void> => {
  if (!isValid.value || status.value === 'loading') return;

  status.value = 'loading';

  try {
    await $fetch('/api/academia-form', {
      method: 'POST',
      body: { ...form }
    });
    status.value = 'success';
    resetForm();
  } catch {
    status.value = 'error';
  }
};
</script>

<template>
  <section
    id="contacto"
    class="academia-form"
  >
    <svg
      width="0"
      height="0"
      class="academia-form__clip-defs"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath
          id="academia-form-form-clip"
          clipPathUnits="objectBoundingBox"
        >
          <path d="M1,0 L0,0 C0.14,0.28 0.14,0.72 0,1 L1,1 Z" />
        </clipPath>
      </defs>
    </svg>

    <Container>
      <div class="academia-form__grid">
        <div
          class="academia-form__aside"
          :style="{ backgroundImage: `url(${asideImage})` }"
        >
          <div class="academia-form__aside-overlay" />
          <div class="academia-form__aside-content">
            <h2 class="academia-form__heading">
              {{ t('academia.form.heading') }}
            </h2>
            <p class="academia-form__description">
              {{ t('academia.form.description') }}
            </p>

            <ul class="academia-form__contact">
              <li
                v-for="item in contactInfo"
                :key="item.id"
                class="academia-form__contact-item"
              >
                <Icon
                  :name="item.icon"
                  class="academia-form__contact-icon"
                />
                <a
                  v-if="item.href"
                  :href="item.href"
                  class="academia-form__contact-value"
                >{{ item.value }}</a>
                <span
                  v-else
                  class="academia-form__contact-value"
                >{{ item.value }}</span>
              </li>
            </ul>
          </div>
        </div>

        <form
          class="academia-form__form"
          @submit.prevent="submitForm"
        >
          <div class="academia-form__row">
            <div class="academia-form__field">
              <label
                class="academia-form__label"
                for="academia-form-name"
              >{{ t('academia.form.fields.name') }}</label>
              <input
                id="academia-form-name"
                v-model="form.name"
                type="text"
                class="academia-form__input"
                :placeholder="t('academia.form.fields.namePlaceholder')"
                required
              >
            </div>
            <div class="academia-form__field">
              <label
                class="academia-form__label"
                for="academia-form-phone"
              >{{ t('academia.form.fields.phone') }}</label>
              <input
                id="academia-form-phone"
                :value="form.phone"
                type="tel"
                inputmode="numeric"
                pattern="[0-9]*"
                class="academia-form__input"
                :placeholder="t('academia.form.fields.phonePlaceholder')"
                required
                @input="onPhoneInput"
              >
            </div>
          </div>

          <div class="academia-form__field">
            <label
              class="academia-form__label"
              for="academia-form-email"
            >{{ t('academia.form.fields.email') }}</label>
            <input
              id="academia-form-email"
              v-model="form.email"
              type="email"
              class="academia-form__input"
              :placeholder="t('academia.form.fields.emailPlaceholder')"
              required
            >
          </div>

          <div class="academia-form__field">
            <label
              class="academia-form__label"
              for="academia-form-message"
            >{{ t('academia.form.fields.message') }}</label>
            <textarea
              id="academia-form-message"
              v-model="form.message"
              class="academia-form__textarea"
              rows="2"
              :placeholder="t('academia.form.fields.messagePlaceholder')"
              required
            />
          </div>

          <div class="academia-form__consent">
            <input
              id="academia-form-consent"
              v-model="form.consent"
              type="checkbox"
              class="academia-form__checkbox"
              required
            >
            <label
              class="academia-form__consent-label"
              for="academia-form-consent"
            >{{ t('academia.form.fields.consent') }}</label>
          </div>

          <button
            type="submit"
            class="academia-form__submit"
            :disabled="!isValid || status === 'loading'"
          >
            <span class="academia-form__submit-label">
              {{ status === 'loading' ? t('academia.form.submit.loading') : t('academia.form.submit.default') }}
            </span>
            <span class="academia-form__submit-icon">
              <Icon name="mdi:arrow-right" />
            </span>
          </button>

          <p
            v-if="status === 'success'"
            class="academia-form__feedback academia-form__feedback--success"
          >
            {{ t('academia.form.submit.success') }}
          </p>
          <p
            v-if="status === 'error'"
            class="academia-form__feedback academia-form__feedback--error"
          >
            {{ t('academia.form.submit.error') }}
          </p>
        </form>
      </div>
    </Container>
  </section>
</template>
