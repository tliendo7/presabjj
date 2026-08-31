/**
 * Sets title, description, Open Graph and Twitter Card for a page based
 * on the i18n keys `${key}.title` / `${key}.subtitle`.
 *
 * El `<link rel="canonical">`, el `og:url` y el `og:locale` (+ alternates)
 * los pone `useLocaleHead()` en app.vue una sola vez para todo el sitio
 * (junto con los hreflang ES/EN) — no se repiten aquí para no acabar con
 * dos canonical/og:url distintos en la misma página.
 */
export function usePageSeo(key: string) {
  const { t } = useI18n();
  const {
    public: { siteUrl }
  } = useRuntimeConfig();

  const title = () => t(`${key}.title`);
  const description = () => t(`${key}.subtitle`);
  // TODO: sustituir por una imagen banner dedicada (1200x630 aprox.)
  // cuando esté disponible; de momento se usa el logo.
  const image = `${siteUrl}/images/logo.png`;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogImage: image,
    ogSiteName: 'PRESA',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image
  });
}
