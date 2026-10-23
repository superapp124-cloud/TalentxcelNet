import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070B14',
          900: '#0B132B',
          800: '#1C2541',
          700: '#2A365D',
          600: '#3A4B7C',
        },
        cobalt: {
          500: '#0080FF',
          600: '#0066CC',
          400: '#3399FF',
        },
        cyan: {
          400: '#00D2FF',
          300: '#33DBFF',
        },
      },
      boxShadow: {
        tvFocus: '0 0 0 4px #00D2FF, 0 8px 30px rgba(0, 210, 255, 0.4)',
        glow: '0 0 25px rgba(0, 128, 255, 0.35)',
      },
    },
  },
  plugins: [],
} satisfies Config
