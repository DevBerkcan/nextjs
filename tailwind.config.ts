import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        kc: { red: '#c21b1c', 'red-dark': '#8f1113', 'red-light': '#e33a3b' },
        carbon: '#08090a',
        industrial: '#101214',
        graphite: '#191c20',
        steel: { dark: '#282d32', grey: '#8e969f', light: '#d4d8dc' },
        heat: '#ff7a1a',
        arc: '#b9dfff',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
