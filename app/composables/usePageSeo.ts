/**
 * Sets title, description, Open Graph, Twitter Card and canonical URL
 * for a page based on the i18n keys `${key}.title` / `${key}.subtitle`.
 */
export function usePageSeo(key: string) {
  const { t } = useI18n();
  const route = useRoute();
  const {
    public: { siteUrl }
  } = useRuntimeConfig();

  const title = () => t(`${key}.title`);
  const description = () => t(`${key}.subtitle`);
  const url = computed(() => `${siteUrl}${route.path}`);
  // TODO: sustituir por una imagen banner dedicada (1200x630 aprox.)
  // cuando esté disponible; de momento se usa el logo.
  const image = `${siteUrl}/images/logo.png`;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: () => url.value,
    ogImage: image,
    ogSiteName: 'PRESA',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image
  });

  useHead({
    link: [{ rel: 'canonical', href: () => url.value }]
  });
}
