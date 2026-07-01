<script setup lang="ts">
interface Props {
  iconName?: string;
  iconPosition?: 'left' | 'right';
  label?: string;
  variant?: 'primary' | 'secondary';
}

const {
  iconName,
  iconPosition = 'right',
  label,
  variant = 'primary'
} = defineProps<Props>();
</script>

<template>
  <button
    class="btn"
    :class="`btn--${variant}`"
  >
    <Icon
      v-if="iconName && iconPosition === 'left'"
      :name="iconName"
      class="btn__icon"
    />
    <span
      v-if="label"
      class="btn__label"
    >{{ label }}</span>
    <slot v-if="!label" />
    <Icon
      v-if="iconName && iconPosition === 'right'"
      :name="iconName"
      class="btn__icon"
    />
  </button>
</template>
