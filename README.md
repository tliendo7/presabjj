# Presa Academy BJJ

Sitio web de Presa Academy BJJ (academia de Brazilian Jiu-Jitsu en La Laguna,
Tenerife): landing de la academia, página del torneo anual (Presa Invitational
Tournament) y contacto. Construido con [Nuxt 4](https://nuxt.com), bilingüe
(ES por defecto / EN con prefijo `/en`).

Este README está pensado para quien herede este repositorio — persona o IA —
sin más contexto que lo que hay aquí escrito. Si eres un agente de IA
trabajando en este código, lee primero la sección
["Convenciones y reglas"](#convenciones-y-reglas-humano-o-ia) antes de tocar
nada.

## Stack

- [Nuxt 4](https://nuxt.com) (Vue 3, `<script setup lang="ts">`)
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) — ES/EN
- [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org) + CSS con metodología BEM
- [@nuxt/image](https://image.nuxt.com) (proveedor IPX)
- [@nuxtjs/sitemap](https://nuxtseo.com/sitemap)
- [@nuxt/eslint](https://eslint.nuxt.com) + Prettier

## Requisitos

- Node **^22.19.0**, **^24.11.0** o **>=26.0.0** (lo exige la propia versión
  de Nuxt instalada — versiones anteriores de Node no funcionan). Si vas a
  desplegar en un panel que te deja elegir versión de Node (por ejemplo
  Hostinger), asegúrate de elegir 22 o 24, nunca 18/20.
- npm (el proyecto usa `package-lock.json`)

## Empezar

```bash
npm install
cp .env.example .env   # y rellena NUXT_GOOGLE_APPS_SCRIPT_URL (ver más abajo)
npm run dev
```

Otros scripts relevantes:

```bash
npm run build           # build de producción (genera .output/)
npm run preview         # sirve el build de producción en local
npm run lint             # eslint
npm run lint:fix
npm run prettier         # solo comprobar formato
npm run prettier:fix
npm run formatter:fix    # prettier:fix + lint:fix, en ese orden (ver nota abajo)
```

> **Nota:** Prettier y ESLint no siempre coinciden al 100% en cómo formatear
> algo. El orden en `formatter:fix` (Prettier primero, ESLint después) es
> intencional: ESLint tiene la última palabra. Si después de
> `formatter:fix` `npx prettier --check` sigue quejándose de algún archivo,
> no es un bug — es la fricción esperada entre ambas herramientas. Lo que
> importa es que `npm run lint` quede limpio.

### Variable de entorno necesaria

`NUXT_GOOGLE_APPS_SCRIPT_URL` — URL del Google Apps Script Web App al que
apuntan los dos formularios del sitio (`server/api/academia-form.post.ts` y
`server/api/contact-form.post.ts`). Sin ella, ambos endpoints devuelven 500. Cómo generarla paso a paso: [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md).

No hay base de datos: los formularios reenvían directamente a ese Apps
Script, que escribe en una Google Sheet.

## Despliegue

Se despliega en **Hostinger** (plan Business/Cloud con soporte Node.js), vía
el conector de GitHub del propio hPanel de Hostinger — no hace falta
`vercel.json` ni `netlify.toml` ni GitHub Actions: cada `git push` a la rama
conectada dispara un rebuild automático desde el propio panel. La variable de
entorno se configura a mano en el dashboard del Web App de Hostinger, nunca
en el repo.

El build usa por defecto el preset `node-server` de Nitro (el genérico para
cualquier hosting Node.js normal), así que no requiere configuración de
`nitro.preset` en `nuxt.config.ts` mientras se despliegue en un entorno
Node genérico como este.

## Estructura del proyecto

```
app/
  components/       # componentes de UI (uno por sección/bloque de página)
  pages/            # rutas (index, academia, torneo, contacto, aviso-legal, privacidad)
  composables/       # lógica reutilizable (usePageSeo, useLocalBusinessSchema, ...)
  middleware/
  assets/css/
    tokens.css        # variables de diseño (colores, spacing, etc.)
    components/       # un .css por componente, mismo nombre, metodología BEM
    pages/             # un .css por página
    main.css           # el único punto de entrada — importa todo lo anterior
i18n/locales/{es,en}.json   # todos los textos del sitio, por idioma
server/api/                  # endpoints de los formularios (ver más arriba)
public/                      # estáticos: imágenes, vídeos, favicons, robots.txt, sitemap, llms.txt
docs/                        # documentación generada (auditorías, code reviews)
agents/rules/                 # reglas de convención para agentes de IA (ver abajo)
prompts/                      # prompts reutilizables para tareas con IA (ver abajo)
coding-guidelines.md           # guía de estilo del proyecto
pendientes.md                   # lista viva de mejoras pendientes (SEO, rendimiento, código)
```

## Convenciones y reglas (humano o IA)

Este repo ya trae su propia documentación de convenciones, pensada para que
tanto una persona nueva como un agente de IA puedan seguir el mismo estilo
sin tener que inferirlo mirando el código:

- **[`coding-guidelines.md`](./coding-guidelines.md)** — la guía de estilo
  general: cómo se estructura un componente (orden de imports, orden del
  `<script setup>`, siempre arrow functions, tipado obligatorio), y cómo se
  escribe el CSS (Tailwind `@apply` + BEM, un archivo por componente,
  breakpoints agrupados).
- **[`agents/rules/`](./agents/rules/)** — reglas más específicas, pensadas
  explícitamente para que las siga un agente de IA al escribir o modificar
  código:
  - `vue-components.md`: convenciones para `app/components/` (props
    tipadas, `:class` combinando estático + dinámico en un solo binding,
    nunca `class` y `:class` a la vez en el mismo elemento).
  - `vue-pages.md`: convenciones para `app/pages/` (SEO a nivel de página,
    `useI18n()`, efectos solo-cliente en `onMounted`).
  - `typescript.md`: tipado estricto en todo `.ts`/`.vue` (tipos de retorno
    explícitos, nada de `any`, `import type` para tipos).
  - `performance.md`: reglas para no romper SSR/SEO ni rendimiento al
    refactorizar (no ocultar contenido above-the-fold con IntersectionObserver,
    no precargar medios no críticos, validar cambios de rendimiento con
    `build` + `preview`, no solo `dev`).
- **[`prompts/code-review.md`](./prompts/code-review.md)** — un prompt ya
  preparado para pedirle a una IA que revise el diff de una rama contra
  `main` y escriba el resultado en `docs/code-review/<ticket>.md`, usando
  como referencia las reglas de arriba.

Si eres una IA a la que le han pedido tocar este código: lee
`coding-guidelines.md` y el archivo de `agents/rules/` que aplique antes de
escribir nada, no solo mires componentes vecinos como referencia (pueden
tener deuda técnica que no es el patrón a seguir).

## Peculiaridades a tener en cuenta

Cosas de este repo que no son obvias a simple vista y que han causado
confusión o errores reales durante el desarrollo:

- **i18n: rutas que "desaparecen" del sitemap.** `nuxt.config.ts` usa
  `customRoutes: 'config'` con un mapa `i18n.pages` explícito. Cualquier
  ruta que no aparezca ahí desaparece del sitemap en los dos idiomas — la
  URL sigue funcionando con normalidad, pero Google/los buscadores dejan de
  verla listada. Si añades una página nueva, añádela también a ese mapa.
- **`sizes` de `@nuxt/image` NO es sintaxis CSS estándar.** No uses
  `sizes="(min-width: 1024px) 50vw, 100vw"` (la sintaxis normal de HTML)
  — `@nuxt/image` en este proyecto usa su propio formato de pares
  `pantalla:valor` (`sm:100vw md:50vw lg:400px...`, con las claves de
  `screens` que tenga configuradas). Pasarle sintaxis CSS estándar no da
  error: el parser interno la trocea mal en silencio y termina pidiendo una
  imagen de 1-2 píxeles al proveedor IPX, rompiendo la imagen visualmente
  sin ningún error en consola. Si quieres usar `sizes`, mira los ejemplos ya
  existentes en `AcademyHero.vue`, `AcademyApp.vue`, `EventGallery.vue` o
  `HomeAcademy.vue` para copiar el formato correcto.
- **CSS: nunca estilos sueltos fuera del sistema.** Cada componente tiene su
  `.css` gemelo en `app/assets/css/components/`, todo bajo un único
  selector raíz con anidación nativa (`&`), y se importa desde
  `components/index.css`. No se escribe CSS inline arbitrario ni se crean
  archivos CSS que no sigan ese patrón.
- **Los formularios no tienen backend propio.** `AcademiaForm.vue` y
  `ContactForm.vue` envían a `server/api/*-form.post.ts`, que reenvían a un
  Google Apps Script (ver `GOOGLE_SHEETS_SETUP.md`). No hay rate-limiting ni
  captcha — está anotado como pendiente en `pendientes.md`.
- **Las páginas legales tienen datos de la empresa pendientes.** `Aviso
Legal` y `Política de Privacidad` (`app/pages/aviso-legal.vue`,
  `privacidad.vue`, contenido en i18n bajo `avisoLegal.*` / `privacidad.*`)
  llevan placeholders (`[NOMBRE COMPLETO O RAZÓN SOCIAL]`, `[NIF/CIF]`,
  `[DOMICILIO COMPLETO]`) — hay un `// TODO` en `LegalPage.vue` que lo
  recuerda. No publicar estas páginas sin sustituir esos datos.
- **Hay varios `// TODO` con decisiones de negocio pendientes**, no bugs:
  URL real de venta de entradas (`EventHero.vue`, `EventInfo.vue`), link
  real de la retransmisión en directo (`EventOnline.vue`), integración con
  Shopify para el bote de premios (`EventInfo.vue`), y la fecha "de
  demo" hardcodeada del countdown (`Countdown.vue`) — todos documentados
  in situ con un comentario explicando qué falta.
- **`pendientes.md`** es una lista viva de mejoras (no todo lo que
  contiene sigue vigente — varios puntos ya se resolvieron y no se han
  retirado todavía de la lista). Trátalo como punto de partida, no como
  verdad absoluta del estado actual; contrástalo con `docs/auditoria-pre-lanzamiento.md`
  (auditoría más reciente y exhaustiva de SEO/rendimiento/accesibilidad) si
  hay contradicción.

## Documentación relacionada

- [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md) — cómo conectar los formularios a Google Sheets.
