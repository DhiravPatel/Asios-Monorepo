/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
    colors: {
      //  'primary': '#f35a38',
      'primary': '#a42832',
      'white': '#fff',
      'black': '#000',
      'gray': '#d4d4d440',
      'blue':"#e7e7e7",
      'neutral-900':'#3f51b5',
      'gradiant': 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)'
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  
  },
  plugins: [],
}