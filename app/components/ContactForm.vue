<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue';

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const { t } = useI18n();
const localePath = useLocalePath();

const WHATSAPP_HREF = 'https://wa.me/34673645324';
const MAILTO_HREF = 'mailto:presaacademybjj@gmail.com';
const ADDRESS_HREF = 'https://maps.app.goo.gl/b4uMq4AGw1sukgba6';

// Listado de acciones de contacto, inspirado en el listado de ofertas de
// consensys.io/careers: filas grandes separadas por líneas, con un icono
// a la derecha. Las dos primeras son accesos directos (WhatsApp / email);
// la tercera despliega el formulario en lugar de navegar a ningún sitio.
const isFormOpen = ref(false);

// Alto del panel medido en px (en vez de max-height/grid-rows "a ojo"):
// así el colapso siempre llega exactamente a 0, sin dejar ningún resquicio
// visible del formulario cuando está cerrado.
const panelInnerRef = ref<HTMLElement | null>(null);
const panelHeight = ref(0);

const measurePanelHeight = async (): Promise<void> => {
  await nextTick();
  panelHeight.value = panelInnerRef.value?.scrollHeight ?? 0;
};

const toggleForm = (): void => {
  isFormOpen.value = !isFormOpen.value;
  if (isFormOpen.value) {
    void measurePanelHeight();
  }
};

const form = reactive<FormState>({
  name: '',
  phone: '',
  email: '',
  message: '',
  consent: false
});

const status = ref<SubmitStatus>('idle');

// El feedback de éxito/error añade una línea al formulario: si el panel
// está abierto en ese momento, hay que volver a medir su alto para que
// no se quede recortado.
watch(status, () => {
  if (isFormOpen.value) {
    void measurePanelHeight();
  }
});

const isValid = computed<boolean>(() =>
  Boolean(
    form.name.trim()
    && form.phone.trim()
    && form.email.trim()
    && form.message.trim()
    && form.consent
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
    await $fetch('/api/contact-form', {
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
  <section class="contact-form">
    <Container>
      <div class="contact-form__grid">
        <div class="contact-form__title-block">
          <span class="contact-form__eyebrow">{{ t('contacto.eyebrow') }}</span>
          <h1 class="contact-form__heading">
            {{ t('contacto.heading') }}
          </h1>
        </div>

        <div class="contact-form__aside">
          <p class="contact-form__description">
            {{ t('contacto.description') }}
          </p>

          <a
            :href="ADDRESS_HREF"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--outline contact-form__cta"
          >
            <span class="btn__label">{{ t('contacto.cta') }}</span>
            <span class="btn__icon">
              <Icon
                name="mdi:arrow-top-right"
                class="btn__icon-svg"
              />
            </span>
          </a>
        </div>

        <ul class="contact-list">
          <li class="contact-list__item">
            <a
              :href="WHATSAPP_HREF"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-list__row"
            >
              <span class="contact-list__label">{{
                t('contacto.list.whatsapp')
              }}</span>
              <span class="contact-list__icon">
                <Icon name="mdi:arrow-top-right" />
              </span>
            </a>
          </li>

          <li class="contact-list__item">
            <a
              :href="MAILTO_HREF"
              class="contact-list__row"
            >
              <span class="contact-list__label">{{
                t('contacto.list.email')
              }}</span>
              <span class="contact-list__icon">
                <Icon name="mdi:arrow-top-right" />
              </span>
            </a>
          </li>

          <li class="contact-list__item">
            <button
              type="button"
              class="contact-list__row"
              :aria-expanded="isFormOpen"
              aria-controls="contact-list-form-panel"
              @click="toggleForm"
            >
              <span class="contact-list__label">{{
                t('contacto.list.form')
              }}</span>
              <span
                class="contact-list__icon contact-list__icon--toggle"
                :class="{ 'is-open': isFormOpen }"
              >
                <Icon name="mdi:plus" />
              </span>
            </button>

            <div
              id="contact-list-form-panel"
              class="contact-list__panel"
              :style="{ maxHeight: isFormOpen ? `${panelHeight}px` : '0px' }"
            >
              <div
                ref="panelInnerRef"
                class="contact-list__panel-inner"
              >
                <form
                  class="contact-form__form"
                  @submit.prevent="submitForm"
                >
                  <div class="contact-form__row">
                    <div class="contact-form__field">
                      <label
                        class="contact-form__label"
                        for="contact-form-name"
                      >{{ t('academia.form.fields.name') }}</label>
                      <input
                        id="contact-form-name"
                        v-model="form.name"
                        type="text"
                        class="contact-form__input"
                        :placeholder="t('academia.form.fields.namePlaceholder')"
                        required
                      >
                    </div>
                    <div class="contact-form__field">
                      <label
                        class="contact-form__label"
                        for="contact-form-phone"
                      >{{ t('academia.form.fields.phone') }}</label>
                      <input
                        id="contact-form-phone"
                        :value="form.phone"
                        type="tel"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        class="contact-form__input"
                        :placeholder="
                          t('academia.form.fields.phonePlaceholder')
                        "
                        required
                        @input="onPhoneInput"
                      >
                    </div>
                  </div>

                  <div class="contact-form__field">
                    <label
                      class="contact-form__label"
                      for="contact-form-email"
                    >{{ t('academia.form.fields.email') }}</label>
                    <input
                      id="contact-form-email"
                      v-model="form.email"
                      type="email"
                      class="contact-form__input"
                      :placeholder="t('academia.form.fields.emailPlaceholder')"
                      required
                    >
                  </div>

                  <div class="contact-form__field">
                    <label
                      class="contact-form__label"
                      for="contact-form-message"
                    >{{ t('academia.form.fields.message') }}</label>
                    <textarea
                      id="contact-form-message"
                      v-model="form.message"
                      class="contact-form__textarea"
                      rows="4"
                      :placeholder="
                        t('academia.form.fields.messagePlaceholder')
                      "
                      required
                    />
                  </div>

                  <div class="contact-form__consent">
                    <input
                      id="contact-form-consent"
                      v-model="form.consent"
                      type="checkbox"
                      class="contact-form__checkbox"
                      required
                    >
                    <i18n-t
                      keypath="academia.form.fields.consent"
                      tag="label"
                      class="contact-form__consent-label"
                      for="contact-form-consent"
                      scope="global"
                    >
                      <template #privacyLink>
                        <NuxtLink
                          :to="localePath('privacidad')"
                          target="_blank"
                          class="contact-form__consent-link"
                        >{{
                          t('academia.form.fields.consentPrivacyLink')
                        }}</NuxtLink>
                      </template>
                    </i18n-t>
                  </div>

                  <button
                    type="submit"
                    class="contact-form__submit"
                    :disabled="!isValid || status === 'loading'"
                  >
                    <span class="contact-form__submit-label">
                      {{
                        status === 'loading'
                          ? t('academia.form.submit.loading')
                          : t('academia.form.submit.default')
                      }}
                    </span>
                    <span class="contact-form__submit-icon">
                      <Icon name="mdi:arrow-right" />
                    </span>
                  </button>

                  <p
                    v-if="status === 'success'"
                    class="contact-form__feedback contact-form__feedback--success"
                  >
                    {{ t('academia.form.submit.success') }}
                  </p>
                  <p
                    v-if="status === 'error'"
                    class="contact-form__feedback contact-form__feedback--error"
                  >
                    {{ t('academia.form.submit.error') }}
                  </p>
                </form>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  </section>
</template>
