// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],

  ssr: true,
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],
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
        wght: [300, 400, 500, 600, 700, 800, 900],
        ital: [500, 700]
      },
      'Saira Condensed': [500, 600, 700, 800, 900],
      'Saira Semi Condensed': [500, 600, 700, 800],
      'Mona Sans': {
        wght: [300, 400, 500, 600, 700, 800]
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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
});
