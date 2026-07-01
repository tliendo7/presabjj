# Coding Guidelines

## Component Structure

### Stylesheet

- Always use existing Tailwind classes when possible. Except in very specific cases, if a value is not defined in Tailwind, it must be added in the library (of components or styles) developed for the specific project.
- Group classes on the same line only when they refer to the same attribute.

```css
@apply px-xs py-s;
@apply flex items-center;
```

- **Breakpoints:** Group styles by responsive breakpoints to ensure clear hierarchy and maintain responsiveness.

```css
@apply w-[283px];
@apply min-w-[283px];

@apply lg:w-[384px];
@apply lg:min-w-[384px];
@apply lg:gap-y-s;

@apply xxl:w-[544px];
@apply xxl:min-w-[544px];
```

- **Grouping:** Use [BEM methodology](https://getbem.com/) to enhance readability and keep styles logically scoped.
  - Block: `parent-element` (main component or container)
  - Element: `__child` (child or sub-part of the block, could be `__child-something`)
  - Modifier (if included): `--modifier` (a variant of the block or element)
  - State: `is-state` (a change of state of the block or element)

```css
.parent-element {
  ...

  & .parent-element__child {
    ...
  }

  & .parent-element__child--left {
    ...
  }

  &.is-active {
    ...
  }
} /* everything is wrapped under the main parent element */
```

---

### Script

- **Imports:** Group imports by context or functionality (add a blank line between groups):
  1. Vue Utilities
  2. External Libraries
  3. Local Utilities and Composables
  4. Components
  5. Models

- **Code Order:** Follow this structure consistently across all components:

```tsx
<script lang="ts" setup>

// 1. Imports
import { ref, reactive, computed, watch, onMounted } from 'vue';

import { useContentModule } from '../../useContentModule';

import MyComponent from '@/components/MyComponent.vue';

// 2. TS types or constants
// (only if needed to define them in the script for specific cases)

// 3. Prop Definition
const { ... } = defineProps<{
  ...
}>({
  // default values if needed
});

// 4. Emits Declaration
const emit = defineEmits<{...}>();

// 5. Store, module or Composable Declarations
const contentModule = useContentModule();

// 6. Reactive Variables and Data Initialization
const itemCount = ref<number>(0);
const reactiveVar = reactive({...});

// 7. Computed Properties
const itemCountMessage = computed(() => ...);

// 8. Functions — always arrow functions
const doSomething = (): void => { ... };

// 9. Lifecycle Functions
onMounted(doSomething);

// 10. Watchers
watch(itemCount, (newValue: number) => {...});

</script>
```

- **Arrow Functions:** Always use arrow functions. Never use regular function declarations.

```ts
// ✅ Correct
const doSomething = (): void => { ... };
const getValue = (id: number): string => { ... };

// ❌ Incorrect
function doSomething(): void { ... }
```

- **TypeScript:** Define types for all elements — variables, computed properties, and function return types. This is mandatory.

---

### Resources

- [Typography Variables](https://storybook-dormakaba.netlify.app/?path=/story/utilities-typography--typography)
- [Variables](https://storybook-dormakaba.netlify.app/?path=/story/utilities-variables--variables)
