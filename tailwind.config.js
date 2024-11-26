/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-1':'#12372A',
        'green-2':'#436850',
        'grey-1':'#ADBC9F',
        'grey-2':'#FBFADA',
        'dark-1': '#304945',
        'dark-2': '#588780',
        'dark-3': '#1c2c29',
      }
    },
  },
  plugins: [],
}

