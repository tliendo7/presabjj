/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.vue'],

  corePlugins: {
    // Evita que choque con nuestra propia clase `.container` (Container.vue),
    // que ya gestiona el max-width vía el token `site`.
    container: false
  },

  theme: {
    // ── Colors ──────────────────────────────────────────────
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // Brand
      black: 'var(--presa-black)',
      gold: 'var(--presa-gold)',
      white: 'var(--presa-white)',

      // Blue scale  (DEFAULT = brand blue)
      blue: {
        DEFAULT: 'var(--presa-blue)',
        100: 'var(--blue-100)',
        300: 'var(--blue-300)',
        500: 'var(--blue-500)',
        600: 'var(--blue-600)',
        700: 'var(--blue-700)',
        900: 'var(--blue-900)'
      },

      // Red scale  (DEFAULT = brand red)
      red: {
        DEFAULT: 'var(--presa-red)',
        100: 'var(--red-100)',
        300: 'var(--red-300)',
        500: 'var(--red-500)',
        600: 'var(--red-600)',
        700: 'var(--red-700)',
        900: 'var(--red-900)'
      },

      // Gray scale  (DEFAULT = brand gray / --gray-600)
      gray: {
        DEFAULT: 'var(--presa-gray)',
        50: 'var(--gray-50)',
        100: 'var(--gray-100)',
        200: 'var(--gray-200)',
        300: 'var(--gray-300)',
        400: 'var(--gray-400)',
        500: 'var(--gray-500)',
        600: 'var(--gray-600)',
        700: 'var(--gray-700)',
        800: 'var(--gray-800)',
        900: 'var(--gray-900)'
      }
    },

    // ── Typography ───────────────────────────────────────────
    fontFamily: {
      'primary': 'var(--font-primary)',
      'secondary': 'var(--font-secondary)',
      'semi-condensed': 'var(--font-semi-condensed)',
      'body': 'var(--font-body)',
      'brier': 'var(--font-brier)',
      'josefin': 'var(--font-josefin)'
    },

    fontSize: {
      'xs': ['var(--text-xs)', { lineHeight: 'var(--leading-xs)' }],
      's': ['var(--text-s)', { lineHeight: 'var(--leading-s)' }],
      'm': ['var(--text-m)', { lineHeight: 'var(--leading-m)' }],
      'l': ['var(--text-l)', { lineHeight: 'var(--leading-l)' }],
      'xl': ['var(--text-xl)', { lineHeight: 'var(--leading-xl)' }],
      '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-2xl)' }],
      '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-3xl)' }],
      '4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-4xl)' }],
      '5xl': ['var(--text-5xl)', { lineHeight: 'var(--leading-5xl)' }],
      '6xl': ['var(--text-6xl)', { lineHeight: 'var(--leading-6xl)' }],
      '7xl': ['var(--text-7xl)', { lineHeight: 'var(--leading-7xl)' }]
    },

    // ── Border radius ────────────────────────────────────────
    borderRadius: {
      'none': '0',
      'sm': 'var(--radius-sm)',
      'md': 'var(--radius-md)',
      'DEFAULT': 'var(--radius-md)',
      'lg': 'var(--radius-lg)',
      'xl': 'var(--radius-xl)',
      '2xl': 'var(--radius-2xl)',
      'full': 'var(--radius-full)'
    },

    extend: {
      // ── Spacing ────────────────────────────────────────────
      // Kept in extend to preserve Tailwind's numeric defaults (0.5, 4, px…)
      // alongside our semantic tokens.
      spacing: {
        xxxs: 'var(--space-xxxs)',
        xxs: 'var(--space-xxs)',
        xs: 'var(--space-xs)',
        s: 'var(--space-s)',
        m: 'var(--space-m)',
        l: 'var(--space-l)',
        xl: 'var(--space-xl)',
        xxl: 'var(--space-xxl)',
        xxxl: 'var(--space-xxxl)'
      },

      // ── Line height ────────────────────────────────────────
      lineHeight: {
        display: '0.886', // display / hero headings
        body: '1.55' // body text / paragraphs
      },

      // ── Letter spacing ─────────────────────────────────────
      letterSpacing: {
        title: '-0.03em', // condensed display titles
        subtitle: '-0.02em', // secondary headings
        nav: '0.08em', // navigation links
        locale: '0.06em' // locale / label text
        // Note: tracking-wider (0.05em) and tracking-widest (0.1em)
        // are already available from Tailwind defaults.
      },

      // ── Max width ──────────────────────────────────────────
      maxWidth: {
        narrow: '36ch', // narrow prose column
        site: '90rem' // max layout width
      },

      // ── Z-index ────────────────────────────────────────────
      zIndex: {
        1: '1' // pseudo-element overlays
      }
    }
  },

  plugins: []
};
