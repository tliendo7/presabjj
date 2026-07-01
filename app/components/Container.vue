<script setup lang="ts">
const { tag = 'div' } = defineProps<{
  tag?: string;
}>();
</script>

<template>
  <component :is="tag" class="container">
    <div class="container__inner">
      <slot />
    </div>
  </component>
</template>
