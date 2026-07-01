<script setup lang="ts">
interface Props {
  text: string;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  color?: string;
  duration?: number;
  stagger?: number;
  initialDelay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'p',
  color: 'var(--red-700)',
  duration: 550,
  stagger: 90,
  initialDelay: 100
});

const containerRef = ref<HTMLElement | null>(null);
const lineGroups = ref<string[][]>([]);
const isReady = ref(false);
const isRevealed = ref(false);

const splitIntoLines = () => {
  if (!containerRef.value) return;

  const cs = window.getComputedStyle(containerRef.value);
  const width = containerRef.value.offsetWidth;

  const measureDiv = document.createElement('div');
  measureDiv.style.cssText = `
    position: absolute;
    top: -9999px;
    left: 0;
    visibility: hidden;
    pointer-events: none;
    width: ${width}px;
    font-family: ${cs.fontFamily};
    font-size: ${cs.fontSize};
    font-weight: ${cs.fontWeight};
    font-style: ${cs.fontStyle};
    letter-spacing: ${cs.letterSpacing};
    word-spacing: ${cs.wordSpacing};
    text-transform: ${cs.textTransform};
    line-height: ${cs.lineHeight};
  `;

  const words = props.text.trim().split(/\s+/);
  words.forEach(word => {
    const span = document.createElement('span');
    span.textContent = word + ' ';
    measureDiv.appendChild(span);
  });

  document.body.appendChild(measureDiv);

  const groups: string[][] = [];
  let currentGroup: string[] = [];
  let currentTop = -1;

  ([...measureDiv.children] as HTMLElement[]).forEach((span, i) => {
    const top = span.offsetTop;
    if (currentTop === -1) currentTop = top;
    if (top !== currentTop) {
      groups.push([...currentGroup]);
      currentGroup = [];
      currentTop = top;
    }
    currentGroup.push(words[i]!);
  });
  if (currentGroup.length) groups.push(currentGroup);

  document.body.removeChild(measureDiv);
  lineGroups.value = groups;
};

let io: IntersectionObserver | null = null;
let ro: ResizeObserver | null = null;

onMounted(() => {
  nextTick(() => {
    splitIntoLines();
    isReady.value = true;

    nextTick(() => {
      if (!containerRef.value) return;

      io = new IntersectionObserver(
        ([entry]) => {
          if (entry!.isIntersecting) {
            setTimeout(() => {
              isRevealed.value = true;
            }, props.initialDelay);
            io?.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      io.observe(containerRef.value);

      ro = new ResizeObserver(() => {
        const prevLines = lineGroups.value.length;
        splitIntoLines();
        if (lineGroups.value.length !== prevLines) {
          isRevealed.value = false;
          requestAnimationFrame(() => {
            isRevealed.value = true;
          });
        }
      });
      ro.observe(containerRef.value);
    });
  });
});

onUnmounted(() => {
  io?.disconnect();
  ro?.disconnect();
});
</script>

<template>
  <component
    :is="tag"
    ref="containerRef"
    class="text-line-reveal"
    :class="{ 'is-ready': isReady, 'is-revealed': isRevealed }"
  >
    <template v-if="!isReady">
      {{ text }}
    </template>

    <template v-else>
      <span
        v-for="(group, i) in lineGroups"
        :key="i"
        class="text-line-reveal__line"
      >
        <span class="text-line-reveal__text">{{ group.join(' ') }}</span>
        <span
          class="text-line-reveal__mask"
          :style="{
            backgroundColor: color,
            transitionDuration: `${duration}ms`,
            transitionDelay: isRevealed ? `${i * stagger}ms` : '0ms'
          }"
          aria-hidden="true"
        />
      </span>
    </template>
  </component>
</template>
