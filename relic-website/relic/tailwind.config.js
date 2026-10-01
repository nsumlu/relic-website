/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F2EAE0',
        parchment: '#E6DAC9',
        brass: { DEFAULT: '#A47F55', light: '#D9B98C' },
        amber: '#B56B28',
        bronze: '#4C382C',
        espresso: '#30271F',
        night: '#1B140F',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      letterSpacing: { caps: '0.22em' },
      transitionTimingFunction: { quiet: 'cubic-bezier(0.2, 0.6, 0.2, 1)' },
    },
  },
  plugins: [],
}
