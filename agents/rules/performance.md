# Rule Set: Performance

**Applies to:** rendering, hydration, CSS delivery, i18n runtime flow, media,
and performance-sensitive refactors.

## Rules

- Preserve SSR-visible content for SEO-critical templates.
- Do not hide above-the-fold content behind observer-driven initial hidden
  states when that content can become an `LCP` candidate.
- Prefer route/component-level CSS over expanding the global entry stylesheet.
- Use preload and image priority only for true above-the-fold assets.
- Do not broadly preload non-critical media.
- Validate meaningful performance changes against `pnpm build` +
  `pnpm preview`, not only `pnpm dev`.
