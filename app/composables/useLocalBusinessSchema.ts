/**
 * Datos estructurados (schema.org) del negocio físico, para que Google lo
 * reconozca como un sitio real con dirección/teléfono/horario y pueda
 * mostrarlo con más detalle en búsquedas locales ("academia bjj tenerife",
 * "cerca de mí") y en el paquete de mapa. Se añade una sola vez, en
 * app.vue, para todo el sitio (la identidad del negocio no cambia por
 * página).
 *
 * NOTA: no incluye `openingHoursSpecification` porque el horario real de
 * clases solo existe como imagen (academia.schedule.imageAlt), no como
 * texto estructurado — añadir horas inventadas aquí sería peor que no
 * poner ninguna. Si en algún momento tenéis el horario en texto, se puede
 * añadir esa propiedad.
 */
export function useLocalBusinessSchema() {
  const { t } = useI18n();
  const localePath = useLocalePath();
  const {
    public: { siteUrl }
  } = useRuntimeConfig();

  const schema = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    'name': 'Presa Academy BJJ',
    'description': t('academia.subtitle'),
    'url': `${siteUrl}${localePath('academia')}`,
    'image': `${siteUrl}/images/logo.png`,
    'telephone': '+34673645324',
    'email': 'presaacademybjj@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Cam. la Piterita, 107, Nave 5',
      'addressLocality': 'La Laguna',
      'addressRegion': 'Santa Cruz de Tenerife',
      'postalCode': '38329',
      'addressCountry': 'ES'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.4757976,
      'longitude': -16.2900439
    },
    'hasMap': 'https://maps.app.goo.gl/b4uMq4AGw1sukgba6',
    'sameAs': [
      'https://www.instagram.com/presaacademybjj',
      'https://www.instagram.com/presabjj/',
      'https://www.instagram.com/santanajiujitsu',
      'https://www.youtube.com/@PRESABJJ'
    ]
  }));

  useHead({
    script: [
      {
        type: 'application/ld+json',
        key: 'local-business-schema',
        innerHTML: () => JSON.stringify(schema.value)
      }
    ]
  });
}
