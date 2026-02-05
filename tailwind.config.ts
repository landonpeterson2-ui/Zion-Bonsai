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
        // Zion Bonsai Brand Colors (matched to logo)
        coral: {
          DEFAULT: '#D8795E',
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
          DEFAULT: '#9CB43D',
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
          DEFAULT: '#7D9331',
          light: '#9CB43D',
          dark: '#5E6E25',
        },
        cream: {
          DEFAULT: '#F8F6F1',
          dark: '#EFEBE0',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
    },
  },
  plugins: [],
}
export default config
