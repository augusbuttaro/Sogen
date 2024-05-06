/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      'orange': '#E29578',
      'light-orange': '#FFDDD2',
      'green': '#83C5BE6A',
      'dark-green': '#006D77',
      'light-green': '#EDF6F9',
      'black': '#000000',
      'gray': '#747171',
      'white': '#FFFFFF',
      'red': '#F81414',
      'red-fifty': '#F8141480'
    },
    boxShadow: {
      'header-shadow': 'inset 0 2px 4px 0 #00000040',
    },
    backgroundImage: {
      'home': "url('./src/assets/home-bg-img.png')",
    },
    gridTemplateColumns: {
      // Simple 16 column grid
      'five': 'repeat(5, minmax(0, 0.5fr));',
    }
  },
  plugins: [],
}

