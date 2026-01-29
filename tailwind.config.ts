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
        // Zion Bonsai Brand Colors
        coral: {
          DEFAULT: '#E87461',
          50: '#FDF5F3',
          100: '#FCE8E4',
          200: '#F9D1C9',
          300: '#F5B9AE',
          400: '#EE9684',
          500: '#E87461',
          600: '#E35540',
          700: '#C23D28',
          800: '#8F2D1E',
          900: '#5C1D13',
        },
        sage: {
          DEFAULT: '#8B9456',
          50: '#F5F6F0',
          100: '#E8EBD9',
          200: '#D4D9B3',
          300: '#BFC78D',
          400: '#A5AE71',
          500: '#8B9456',
          600: '#6F7944',
          700: '#545B33',
          800: '#383D22',
          900: '#1D1F11',
        },
        olive: {
          DEFAULT: '#5C6B3D',
          light: '#6F7944',
          dark: '#4A5531',
        },
        cream: {
          DEFAULT: '#F5F1E8',
          dark: '#E8E3D6',
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
