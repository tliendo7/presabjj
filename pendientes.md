# Pendientes

Lista de mejoras identificadas (SEO, rendimiento, código) que quedan por resolver.
Según se vayan solucionando, se borran de aquí.

## SEO / contenido

- [ ] **Datos estructurados (schema.org / JSON-LD)**: `LocalBusiness` para
      home/academia (dirección, horario, teléfono) y `Event` para el torneo.
      Mejora cómo aparece la web en resultados de Google (rich snippets) y
      Google Maps. Aparcado a propósito, retomar cuando se quiera.

## Rendimiento / medios

- [ ] **Limpieza y compresión de imágenes/vídeos**: hay vídeos de hasta
      150MB y fotos de +10MB sin comprimir en `public/`. Pendiente de
      limpieza manual (borrar los que no se usan) antes de optimizar.
- [ ] **Migrar `<img>` a `NuxtImg`/`NuxtPicture`**: `@nuxt/image` está
      instalado pero no se usa; las imágenes se sirven sin `srcset`, sin
      conversión a WebP/AVIF y sin lazy loading automático.

## Seguridad / dependencias

- [ ] **`npm audit fix`**: 13 vulnerabilidades en dependencias (2 críticas
      en `tar`, varias altas en `sharp`/`ipx`, `svgo`, `shell-quote`). Todas
      con fix disponible sin `--force`.
- [ ] **Protección anti-spam en `/api/academia-form`**: valida bien los
      campos, pero no tiene rate-limiting ni captcha. Al mandar directo a un
      Google Apps Script, es vulnerable a spam si alguien encuentra el
      endpoint.

## Código / mantenimiento

- [ ] **Script de `typecheck`**: no hay un `npm run typecheck` (`nuxi
      typecheck`) en `package.json` para pillar errores de tipos antes de
      deploy.
- [ ] **Componentes comentados sin usar**: `EventManifesto` y `Parallax`
      están comentados en `evento.vue` pero sus ficheros siguen en el
      proyecto. Decidir si se borran o se retoman (y si se retoman, dejarlo
      anotado en vez de solo comentado).
- [ ] **Confirmar si `Brier-Bold.otf` se usa**: por el CSS, la fuente Brier
      solo se usa en su peso Regular (400) en todo el sitio. Si se confirma
      que el Bold nunca se usa, se puede quitar ese archivo y su
      `@font-face` de `tokens.css`.

## Favicon / PWA

- [ ] **Favicon/manifiesto incompleto**: solo hay `favicon.ico`. Falta
      `apple-touch-icon` (icono al guardar en pantalla de inicio del móvil)
      y, opcionalmente, `manifest.json` con `theme-color`.
