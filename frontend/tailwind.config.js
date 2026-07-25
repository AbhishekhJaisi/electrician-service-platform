/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: '#101216',
        panel: '#1B1E24',
        'panel-2': '#22262E',
        copper: '#C1662F',
        'copper-light': '#E08A55',
        hazard: '#F0B429',
        paper: '#F4F1EA',
        steel: '#8A8F98',
        'steel-dim': '#5B5F68',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['"Work Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
