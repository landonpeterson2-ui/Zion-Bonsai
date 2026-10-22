import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand tokens (CSS variables in app/globals.css)
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        'paper-deep': 'rgb(var(--color-paper-deep) / <alpha-value>)',
        sandstone: 'rgb(var(--color-sandstone) / <alpha-value>)',
        linen: 'rgb(var(--color-linen) / <alpha-value>)',
        clay: 'rgb(var(--color-clay) / <alpha-value>)',
        'clay-dark': 'rgb(var(--color-clay-dark) / <alpha-value>)',
        moss: 'rgb(var(--color-moss) / <alpha-value>)',
        forest: 'rgb(var(--color-forest) / <alpha-value>)',
        soil: 'rgb(var(--color-soil) / <alpha-value>)',

        // LEGACY — removed in task 42 (only the DEFAULT of coral and sage are tokens)
        coral: {
          DEFAULT: 'rgb(var(--color-coral) / <alpha-value>)',
          50: '#FDF6F4',
          100: '#FCEAE5',
          200: '#F8D3C9',
          300: '#F2B5A5',
          400: '#E89780',
          500: '#D8795E',
          600: '#C5624A',
          700: '#A64D39',
          800: '#7A3829',
          900: '#4E241A',
        },
        sage: {
          DEFAULT: 'rgb(var(--color-sage) / <alpha-value>)',
          50: '#F6F9EE',
          100: '#EBF2D8',
          200: '#D7E5B2',
          300: '#C0D586',
          400: '#ADC65E',
          500: '#9CB43D',
          600: '#7D9331',
          700: '#5E6E25',
          800: '#3F4919',
          900: '#20250C',
        },
        olive: {
          DEFAULT: '#647C11',
          light: '#9CB43D',
          dark: '#5E6E25',
        },
        cream: {
          DEFAULT: '#AF8C57',
          dark: '#EFEBE0',
          light: '#FBF8F3',
        },
        charcoal: '#2A2A28',
      },
      borderRadius: {
        organic: '42% 58% 55% 45% / 48% 42% 58% 52%',
        soft: '1.25rem',
      },
      fontSize: {
        display: ['clamp(2.5rem, 1.6rem + 4vw, 4.5rem)', { lineHeight: '1.05' }],
        title: ['clamp(1.875rem, 1.4rem + 2vw, 3rem)', { lineHeight: '1.1' }],
        lead: ['1.25rem', { lineHeight: '1.6' }],
      },
      maxWidth: {
        'prose-narrow': '38rem',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        label: ['var(--font-label)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
    },
  },
  plugins: [],
}
export default config
