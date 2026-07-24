<script setup lang="ts">
const { tm, rt, t } = useI18n();

interface Review {
  quote: string;
  author: string;
}

const heading = computed<string>(() => t('academia.join.heading'));
const description = computed<string>(() => t('academia.join.description'));
const cta = computed<string>(() => t('academia.join.cta'));

const reviews = computed<Review[]>(() =>
  (tm('academia.join.reviews') as Review[]).map(r => ({
    quote: rt(r.quote),
    author: rt(r.author)
  }))
);

const marqueeReviews = computed<Review[]>(() => [
  ...reviews.value,
  ...reviews.value
]);
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
              {{ heading }}
            </h2>
            <TextLineReveal
              class="academy-join__description"
              :text="description"
              color="#e4e4e4"
            />

            <a
              class="academy-join__cta"
              href="#"
            >
              {{ cta }}
            </a>
          </div>

          <div
            class="academy-join__reviews"
            aria-hidden="false"
          >
            <div
              v-for="(review, i) in reviews"
              :key="review.quote"
              class="academy-join__review"
              :class="`academy-join__review--${i % 5}`"
            >
              <p class="academy-join__review-quote">
                {{ review.quote }}
              </p>
              <span class="academy-join__review-author">{{
                review.author
              }}</span>
            </div>
          </div>
        </div>

        <div class="academy-join__marquee-wrap">
          <div class="academy-join__marquee-track">
            <div
              v-for="(review, i) in marqueeReviews"
              :key="'m-' + i + review.quote"
              class="academy-join__review academy-join__review--marquee"
            >
              <p class="academy-join__review-quote">
                {{ review.quote }}
              </p>
              <span class="academy-join__review-author">{{
                review.author
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
