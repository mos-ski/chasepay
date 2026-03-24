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
        page:     '#0A0E1A',
        surface:  '#111827',
        surface2: '#1A2234',
        stroke:   '#1F2D45',
        primary:  { DEFAULT: '#FF6B2B', hover: '#FF7D42', light: 'rgba(255,107,43,0.12)' },
        ink:      { DEFAULT: '#F1F5F9', muted: '#94A3B8', subtle: '#64748B' },
        success:  '#10B981',
        warning:  '#F59E0B',
        'danger-light': '#F97316',
        danger:   '#EF4444',
        blue:     '#3B82F6',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        syne: ['Syne', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
