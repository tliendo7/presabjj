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
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
      index: {
        es: '/',
        en: '/'
      },
      torneo: {
        es: '/torneo',
        en: '/tournament'
      },
      academia: {
        es: '/academia',
        en: '/academy'
      }
    }
  }
});
