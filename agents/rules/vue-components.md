# Rule Set: Vue Components

**Applies to:** `app/components/`

## Rules

- Use `<script setup lang="ts">`
- Prefer `defineProps<SharedType>()` when a shared UI/component type exists; otherwise use `defineProps<{ ... }>()` with typed props
- Destructure `defineProps` defaults in the component when it matches nearby component patterns
- Keep type imports with `import type`
- Keep presentational components props-driven; use direct store access only in orchestration/app-shell components
- When an element needs both a static class and any dynamic class (conditional object, expression, or variable), merge them into a single `:class` array binding — never use `class` and `:class` side by side on the same element: `:class="['static-class', dynamicClass]"` or `:class="['static-class', { 'some-class': condition }]"`
