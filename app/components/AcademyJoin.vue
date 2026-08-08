<script setup lang="ts">
const { tm, rt, t } = useI18n();

interface GalleryImage {
  alt: string;
}

const headingWords = computed<string[]>(() =>
  t('academia.join.heading').split(' ').filter(Boolean)
);

// Imagen fija de la izquierda. Ruta fija en el componente, siguiendo el
// mismo patrón que AcademyHighlights/AcademyUs.
const mainImage = '/images/class/_CIR8577.jpg';

// Imágenes del carrusel de la derecha. El carrusel solo cambia la imagen:
// la chip del bloque es fija (no depende de la imagen activa).
const carouselSrcs = [
  '/images/seminars/090526_SBJJ_TaylorPearman-16.jpg',
  '/images/seminars/090526_SBJJ_TaylorPearman-81.jpg',
  '/images/class/_CIR5266.jpg',
  '/images/class/_CIR5339.jpg',
  '/images/past-events/presa-invitational-tournament-11.jpg'
];

const galleryImages = computed<GalleryImage[]>(() =>
  (tm('academia.join.gallery.images') as GalleryImage[]).map(img => ({
    alt: rt(img.alt)
  }))
);

const activeCarouselIndex = ref(0);

const activeCarouselSrc = computed<string>(
  () =>
    carouselSrcs[activeCarouselIndex.value % carouselSrcs.length] as string
);
const activeCarouselAlt = computed<string | undefined>(
  () => galleryImages.value[activeCarouselIndex.value % galleryImages.value.length]?.alt
);

const goToPrevImage = (): void => {
  activeCarouselIndex.value =
    (activeCarouselIndex.value - 1 + carouselSrcs.length) % carouselSrcs.length;
};

const goToNextImage = (): void => {
  activeCarouselIndex.value = (activeCarouselIndex.value + 1) % carouselSrcs.length;
};
</script>

<template>
  <section class="academy-join">
    <Container>
      <div>
        <div class="academy-join__grid">
          <div class="academy-join__intro">
            <div class="academy-join__icon">
              <img
                src="/images/A.png"
                alt="Presa logo mark"
                class="w-10"
              >
              <span>Presa Culture</span>
            </div>

            <h2 class="academy-join__heading">
              <span
                v-for="(word, i) in headingWords"
                :key="i + word"
                class="academy-join__heading-line"
              >{{ word }}</span>
            </h2>
            <TextLineReveal
              class="academy-join__description"
              :text="t('academia.join.description')"
              color="#e4e4e4"
            />

            <a
              class="academy-join__cta"
              href="#"
            >
              {{ t('academia.join.cta') }}
            </a>
          </div>

          <div class="academy-join__gallery">
            <div class="academy-join__gallery-item academy-join__gallery-item--main">
              <img
                :src="mainImage"
                :alt="t('academia.join.gallery.main.alt')"
                class="academy-join__gallery-img"
              >
              <span class="academy-join__gallery-badge">{{ t('academia.join.gallery.main.label') }}</span>
              <div
                class="academy-join__gallery-scrim"
                aria-hidden="true"
              />
              <p class="academy-join__gallery-caption">
                {{ t('academia.join.gallery.main.caption') }}
              </p>
            </div>

            <div class="academy-join__gallery-item academy-join__gallery-item--carousel">
              <transition name="academy-join-fade">
                <img
                  :key="activeCarouselSrc"
                  :src="activeCarouselSrc"
                  :alt="activeCarouselAlt"
                  class="academy-join__gallery-img"
                >
              </transition>
              <span class="academy-join__gallery-badge">{{ t('academia.join.gallery.carousel.label') }}</span>
            </div>

            <div class="academy-join__gallery-nav">
              <button
                type="button"
                class="academy-join__gallery-arrow"
                :aria-label="t('academia.join.gallery.prevLabel')"
                @click="goToPrevImage"
              >
                <Icon
                  name="mdi:arrow-left"
                  class="academy-join__gallery-arrow-icon"
                />
              </button>
              <button
                type="button"
                class="academy-join__gallery-arrow academy-join__gallery-arrow--filled"
                :aria-label="t('academia.join.gallery.nextLabel')"
                @click="goToNextImage"
              >
                <Icon
                  name="mdi:arrow-right"
                  class="academy-join__gallery-arrow-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
