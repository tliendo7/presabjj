# Auditoría pre-lanzamiento — Presa (presaculturebjj.com)

Fecha: 31 agosto 2026. Repaso completo del repo (SEO, SEO para IA, rendimiento, accesibilidad, i18n, legal y housekeeping de código) de cara a la publicación.

Leyenda: 🔴 Crítico (antes de publicar) · 🟠 Importante (primeras semanas) · 🟡 Recomendado (mejora continua)

---

## 🔴 Crítico — antes de publicar

1. **Todo el trabajo de esta sesión está sin commitear.** `git status` muestra ~25 archivos modificados y varios nuevos (Footer, i18n, ContactForm, imágenes nuevas, etc.) que solo existen en tu disco local. Si algo le pasa a la máquina o a la carpeta, se pierde todo. Commitea y haz push cuanto antes.

2. **El footer no está traducido.** Los títulos y links de columna ("ACADEMIA", "TORNEO BJJ", "CONÓCENOS", "HORARIOS Y TARIFAS", "COMPRA TU ENTRADA", "CONTACTO"...) están escritos directamente en español en `Footer.vue`, no pasan por i18n. Un visitante que cambia a inglés ve toda la página en inglés excepto el footer.

3. **Título SEO de la página del torneo en español dice "2025".** `evento.title` = _"Presa Invitational Tournament 2025"_, pero el evento es el 14 nov **2026**. Aparecerá así en Google. (La versión en inglés no tiene este problema porque no incluye el año.)

4. **Typo en el `<title>` de la home (ES).** "Un**é**te a la comunidad" → debería ser "Ún**e**te".

5. **3 CTAs de "Comprar entradas" apuntan a `#`** (Home banner, Hero del torneo, cierre de la sección de info). Ya están marcados con TODO en el código a la espera de la URL de venta de entradas, pero si publicáis sin esa URL, esos botones no hacen nada.

6. **No existe página de Aviso Legal / Política de Privacidad / Cookies.** Tenéis dos formularios que recogen nombre, teléfono y email (Academia y Contacto) con checkbox de consentimiento, pero ese consentimiento no enlaza a ningún documento legal. En España/UE esto es obligatorio antes de recoger datos personales.

---

## 🟠 Importante — primeras semanas tras publicar

7. **Faltan hreflang entre ES/EN.** El sitio es bilingüe pero no genera `<link rel="alternate" hreflang="es|en">` en el `<head>`. Google puede indexar ambas versiones como contenido duplicado o mostrar el idioma equivocado en el idioma equivocado. Se soluciona con `useLocaleHead()` de `@nuxtjs/i18n` en `app.vue`.

8. **Cero datos estructurados (JSON-LD).** No hay ningún schema.org en el sitio. Con lo que ya tenéis montado, hay 3 añadidos de alto impacto y bajo esfuerzo:
   - `SportsActivityLocation` / `LocalBusiness` (nombre, dirección, teléfono, geo, horarios) → aparece en Google Maps/búsquedas locales con más detalle.
   - `Event` para el torneo (fecha, ubicación, `offers` cuando haya venta de entradas) → puede salir como tarjeta de evento en Google.
   - `FAQPage` para la sección de FAQ de la Academia → puede generar los desplegables directamente en el resultado de búsqueda, y es justo el tipo de contenido que más ayuda a que las IAs (ChatGPT, Perplexity, Google AI Overviews) citen la web correctamente.

9. **Sin analítica ni Search Console/Bing Webmaster verificados.** No hay GA4, Meta Pixel ni ninguna herramienta de medición instalada. Antes de publicar conviene decidir qué queréis medir (aunque sea mínimo) y verificar el dominio en Google Search Console para poder enviar el sitemap y ver cómo indexa Google.

10. **Vídeos sin optimizar para web.** Los 3 vídeos de fondo pesan 16–47 MB (`video-niños-bjj.mp4` a 16.5 Mbps de bitrate en 1080×1920 — un vídeo web bien comprimido debería rondar 3-6 Mbps). Esto es mucho peso para cualquier visitante, especialmente en móvil/datos. Ninguno tiene `preload="metadata"` ni `poster`, así que hasta que cargan se ve un hueco en blanco. Recomiendo recomprimirlos (H.264, bitrate más bajo, o servirlos como WebM adicional) antes de publicar.

11. **Imágenes sin optimizar en un par de casos puntuales.** `090526_SBJJ_Camisetas-17.jpg` (9.3 MB) y `presa-invitational-tournament-16.jpg` (9.1 MB) son mucho más pesadas que el resto (la mayoría está entre 100-600 KB). `@nuxt/image` las redimensiona al servirlas, pero el archivo original tan pesado sigue penalizando el build y cualquier uso directo.

12. **Ninguna imagen especifica `width`/`height` ni `sizes`.** Las 34 imágenes del sitio usan `<NuxtImg>` sin esos atributos. Sin ellos el navegador no puede reservar el espacio antes de que cargue la imagen (esto es la causa nº1 de "Cumulative Layout Shift" en las auditorías de rendimiento tipo Lighthouse/PageSpeed).

13. **No hay sitio verificado en ningún hosting/CI.** No encuentro `vercel.json`, `netlify.toml` ni GitHub Actions. Si el plan es desplegar en Vercel/Netlify hay que configurarlo (incluyendo la variable de entorno `googleAppsScriptUrl` en el hosting, ya que ahora mismo solo vive en tu `.env` local).

---

## 🟡 Recomendado — mejora continua

14. **Imagen social (Open Graph) genérica.** Todas las páginas comparten el logo como imagen de previsualización al compartir en redes/WhatsApp (`usePageSeo.ts` ya lo marca con un TODO). Una imagen 1200×630 diseñada por página (torneo, academia, home) se ve mucho mejor al compartir.

15. **Sin favicon completo ni manifest.** Solo hay `favicon.ico`. Faltan variantes PNG (192×192, 512×512), `apple-touch-icon` y un `site.webmanifest` — hoy en día se nota especialmente en iOS/Android al "añadir a pantalla de inicio" y en pestañas de Safari.

16. **`llms.txt` (opcional, emergente).** No es un estándar oficial todavía, pero cada vez más sitios añaden un `/llms.txt` con un resumen del sitio en texto plano para que los crawlers de IA lo lean fácilmente. Bajo esfuerzo, posible ventaja a futuro.

17. **Sin "saltar al contenido" (skip link) ni apenas estilos `:focus-visible` propios** (solo 4 reglas en todo el CSS). Para accesibilidad de teclado conviene añadir un skip-link antes del navbar y revisar que todos los elementos interactivos (checkbox, filas del listado de contacto, botones) tengan un estado de foco visible y claro.

18. **`~14 archivos de fuente` autoalojados** (Saira, Saira Condensed, Mona Sans, Josefin Sans + Brier). Está bien que estén autoalojadas (evita la petición externa a Google Fonts, ya lo hacéis bien), pero merece la pena revisar si usáis realmente todos los pesos cargados o se puede recortar alguno.

19. **Commits genéricos.** El historial de git tiene muchos commits llamados literalmente "changes". No bloquea nada, pero mensajes descriptivos ayudan mucho si en el futuro hay que buscar cuándo se cambió algo.

20. **TODOs pendientes de contenido real** (ninguno bloquea el lanzamiento, pero conviene tenerlos listados):
    - Vídeo/imagen definitivos de cada edición anterior en la galería del torneo (`EventGallery.vue`).
    - Link real de la retransmisión en directo del día del evento (`EventOnline.vue`).
    - Imagen/flyer definitivo del Tournament 2026 para la tarjeta "en directo".
    - Conectar el bote de premios con Shopify quan esté listo (`EventInfo.vue`).
    - El countdown sigue usando una fecha de texto "hardcodeada" (`evento.countdown.label`) en vez de calcularse sola — ya lo hablamos, sigue pendiente de decidir si se revierte.
    - `<HomeIntro />` está comentado en `index.vue` — confirma si es intencional o se quedó a medias.

---

## Lo que ya está bien (no toques)

- `robots.txt` correcto y apuntando al sitemap.
- `@nuxtjs/sitemap` instalado y configurado con las rutas ES/EN.
- Cada página tiene exactamente un `<h1>` (algunos son `sr-only` a propósito, que es válido).
- Todas las imágenes tienen `alt`.
- No hay ningún `console.log` ni meta `noindex` olvidado en el código.
- Fuentes autoalojadas con `font-display: swap` y `preload` — buena práctica ya aplicada.
- Página 404/error personalizada y traducida.
- `.env` correctamente ignorado por git (el secreto de Google Apps Script no está expuesto en el repo).
