// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap'
  ],

  ssr: true,
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      meta: [{ name: 'theme-color', content: '#a40a2f' }]
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://presaculturebjj.com'
  },

  runtimeConfig: {
    googleAppsScriptUrl: '',
    public: {
      siteUrl: 'https://presaculturebjj.com'
    }
  },

  // Estrategia de caché de los estáticos (ver docs/auditoria-pre-lanzamiento.md
  // y la conversación sobre el punto 2 de la auditoría del cliente): sin esto,
  // Nitro no le manda a los navegadores/CDN ninguna cabecera de caché fuerte
  // para lo que vive en `public/`, así que cada visita vuelve a pedir cada
  // imagen/vídeo/fuente entera al servidor.
  routeRules: {
    // JS/CSS generados por el build: llevan un hash en el propio nombre de
    // archivo (p. ej. `entry.ABC123.js`), así que son inmutables por
    // definición — si el contenido cambia, cambia el nombre. Caché máxima
    // segura.
    '/_nuxt/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    },
    // Imágenes, vídeos y fuentes de `public/`: NO llevan hash en el nombre,
    // así que "immutable" sería peligroso si en el futuro se sustituye un
    // archivo manteniendo el mismo nombre (ya ha pasado en este proyecto).
    // Caché moderada (1 día) + revalidación: menos peticiones repetidas sin
    // arriesgarse a servir una versión vieja indefinidamente.
    '/images/**': {
      headers: { 'cache-control': 'public, max-age=86400, must-revalidate' }
    },
    '/videos/**': {
      headers: { 'cache-control': 'public, max-age=86400, must-revalidate' }
    },
    '/fonts/**': {
      headers: { 'cache-control': 'public, max-age=86400, must-revalidate' }
    }
  },
  compatibilityDate: '2025-07-15',

  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit']
    }
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        semi: true,
        indent: 2,
        commaDangle: 'only-multiline'
      }
    }
  },

  googleFonts: {
    download: true,
    families: {
      'Saira': {
        wght: [300, 400, 600, 700],
        ital: [700]
      },
      'Saira Condensed': [400, 700],
      'Mona Sans': {
        wght: [400, 500, 600, 700]
      },
      'Josefin Sans': {
        wght: [400, 600, 700]
      }
    },
    display: 'swap',
    preload: true
  },

  i18n: {
    // Adds /en prefix for English; Spanish (default) has no prefix
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    locales: [
      {
        code: 'es',
        language: 'es-ES',
        name: 'Español',
        file: 'es.json'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    detectBrowserLanguage: false,

    // Ojo: con `customRoutes: 'config'`, el módulo de sitemap solo detecta
    // como páginas del sitio las que aparecen aquí explícitamente (incluida
    // "index", aunque no tenga ruta personalizada) — si se omite alguna,
    // desaparece del sitemap en los dos idiomas aunque la URL siga
    // funcionando con normalidad.
    customRoutes: 'config',
    pages: {
      'index': {
        es: '/',
        en: '/'
      },
      'torneo': {
        es: '/torneo',
        en: '/tournament'
      },
      'academia': {
        es: '/academia',
        en: '/academy'
      },
      'contacto': {
        es: '/contacto',
        en: '/contact'
      },
      'aviso-legal': {
        es: '/aviso-legal',
        en: '/legal-notice'
      },
      'privacidad': {
        es: '/privacidad',
        en: '/privacy'
      }
    }
  },
});
