/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#1751D0',
          600: '#1343AA',
          700: '#0F3485',
        }
      },
    },
  },
  plugins: [],
}

