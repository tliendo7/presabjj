# Rule Set: Vue Pages

**Applies to:** `app/pages/`

## Rules

- Use `<script setup lang="ts">`
- Keep `onMounted` for client-only side effects (scroll, UI behavior, animations)
- Use `useI18n()` for locale-aware text
- Define page metadata (`useHead` / `useSeoMeta`) at page level
