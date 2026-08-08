<script setup lang="ts">
interface Props {
  iconName?: string;
  iconPosition?: 'left' | 'right';
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  // Icono extra, siempre a la izquierda del label, independiente del
  // `iconPosition` de arriba (que sigue controlando `iconName`). Pensado
  // para botones con dos iconos a la vez, p. ej. uno "de contexto" a la
  // izquierda (carrito, etc.) y la flecha de siempre a la derecha.
  leadingIconName?: string;
}

const {
  iconName,
  iconPosition = 'right',
  label,
  variant = 'primary',
  leadingIconName
} = defineProps<Props>();
</script>

<template>
  <button
    class="btn"
    :class="`btn--${variant}`"
  >
    <span
      v-if="leadingIconName"
      class="btn__icon"
    >
      <Icon
        :name="leadingIconName"
        class="btn__icon-svg"
      />
    </span>
    <span
      v-if="iconName && iconPosition === 'left'"
      class="btn__icon"
    >
      <Icon
        :name="iconName"
        class="btn__icon-svg"
      />
    </span>
    <span
      v-if="label"
      class="btn__label"
    >{{ label }}</span>
    <slot v-if="!label" />
    <span
      v-if="iconName && iconPosition === 'right'"
      class="btn__icon"
    >
      <Icon
        :name="iconName"
        class="btn__icon-svg"
      />
    </span>
  </button>
</template>
