import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        page:    '#F6F9FC',
        surface: '#FFFFFF',
        stroke:  '#E3E8EF',
        primary: { DEFAULT: '#635BFF', hover: '#5851EA', light: '#F0EFFF' },
        ink:     { DEFAULT: '#0A2540', muted: '#425466', subtle: '#8898AA' },
        success: '#30B057',
        warning: '#F4B740',
        'danger-light': '#F97316',
        danger:  '#DF1B41',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
