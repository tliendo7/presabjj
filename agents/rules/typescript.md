# Rule Set: TypeScript

**Applies to:** all `.ts` and `.vue` files

## Rules

- Exported functions must include explicit return types
- All parameters must be typed (prefer local `interface Payload` for structured inputs)
- Add explicit annotations for nullable/empty-init variables (`Type | null`, `Type[]`)
- Use `import type` for type-only imports
- Prefer `interface` for object shapes and `type` for unions/aliases
- Avoid `any`; use `unknown` and narrow before use
