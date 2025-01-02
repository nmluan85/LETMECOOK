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
          100: "#f1f5fd",
          150: "#d3e0fa",
          200: "#b5caf7",
          250: "#98b5f4",
          300: "#7a9ff0",
          350: "#5c8aed",
          400: "#3e74ea",
          450: "#205fe6",
          500: "#1751d0",
          550: "#154abc",
          600: "#1343aa",
          650: "#113b97",
          700: "#0f3485",
          750: "#0d2d73",
          800: "#0b2660",
          850: "#091f4e",
          900: "#07173c",
        },
        secondary: {
          default: '#22ccb2',
        },
      },
      width: {
        '1/6': '16.6667%',
        '1/7': '14.2857%', 
        '1/8': '12.5%',   
        '1/9': '10.5%',
        '1/10': '10%',  
        '5/6': '83.3333%',  
      },
    },
  },
  plugins: [],
}