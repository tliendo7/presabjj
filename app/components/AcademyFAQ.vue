<script setup lang="ts">
import { ref, computed } from 'vue';

interface FaqCategory {
  id: string;
  label: string;
}

interface FaqQuestion {
  category: string;
  question: string;
  answer: string;
}

const { tm, rt, t } = useI18n();

const activeCategory = ref<string>('');
const openIndex = ref<number | null>(0);

const categories = computed<FaqCategory[]>(() =>
  (tm('academia.faq.categories') as FaqCategory[]).map(category => ({
    id: rt(category.id),
    label: rt(category.label)
  }))
);

const questions = computed<FaqQuestion[]>(() =>
  (tm('academia.faq.questions') as FaqQuestion[]).map(question => ({
    category: rt(question.category),
    question: rt(question.question),
    answer: rt(question.answer)
  }))
);

const selectedCategory = computed<string>(
  () => activeCategory.value || categories.value[0]?.id || ''
);

const visibleQuestions = computed<FaqQuestion[]>(() =>
  questions.value.filter(
    question => question.category === selectedCategory.value
  )
);

const selectCategory = (id: string): void => {
  if (selectedCategory.value === id) return;
  activeCategory.value = id;
  openIndex.value = 0;
};

const toggle = (index: number): void => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <section class="academy-faq">
    <Container>
      <div class="academy-faq__grid">
        <!-- ── Left column: heading, description and category chips ── -->
        <div class="academy-faq__aside">
          <h2 class="academy-faq__heading">
            {{ t('academia.faq.heading') }}
          </h2>
          <p class="academy-faq__description">
            {{ t('academia.faq.description') }}
          </p>

          <div
            class="academy-faq__chips"
            role="tablist"
            :aria-label="t('academia.faq.heading')"
          >
            <button
              v-for="category in categories"
              :key="category.id"
              type="button"
              role="tab"
              class="academy-faq__chip"
              :class="{ 'is-active': selectedCategory === category.id }"
              :aria-selected="selectedCategory === category.id"
              @click="selectCategory(category.id)"
            >
              {{ category.label }}
            </button>
          </div>
        </div>

        <!-- ── Right column: questions & answers accordion ── -->
        <ul class="academy-faq__list">
          <li
            v-for="(item, index) in visibleQuestions"
            :key="`${selectedCategory}-${index}`"
            class="academy-faq__item"
          >
            <button
              type="button"
              class="academy-faq__question"
              :class="{ 'is-open': openIndex === index }"
              :aria-expanded="openIndex === index"
              :aria-controls="`academy-faq-answer-${index}`"
              @click="toggle(index)"
            >
              <span class="academy-faq__question-text">
                {{ item.question }}
              </span>
              <span
                class="academy-faq__icon"
                aria-hidden="true"
              >
                <span class="academy-faq__icon-bar" />
                <span
                  class="academy-faq__icon-bar academy-faq__icon-bar--vertical"
                />
              </span>
            </button>

            <div
              :id="`academy-faq-answer-${index}`"
              class="academy-faq__answer"
              :class="{ 'is-open': openIndex === index }"
              role="region"
            >
              <div class="academy-faq__answer-inner">
                <p class="academy-faq__answer-text">
                  {{ item.answer }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  </section>
</template>
