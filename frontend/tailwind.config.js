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
        'copper-dark': '#A3561F',
        hazard: '#F0B429',
        paper: '#F4F1EA',
        steel: '#B8BCC4',
        'steel-dim': '#9BA0A9',
        'warm-gray': '#FFFFFF',
        'soft-black': '#2B2B2B',
        heading: '#1A1A1A',
        assamese: '#C9601F',
        'warm-muted': '#6B6B6B',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
