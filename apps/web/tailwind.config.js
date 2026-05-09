/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Top-level overrides retained for backwards compat with pages that depend on
    // the legacy single-value tokens (`bg-gray`, `bg-blue`). New work should
    // prefer the brand tokens added via `extend.colors` below.
    colors: {
      'primary': '#a42832',
      'white': '#fff',
      'black': '#000',
      'gray': '#d4d4d440',
      'blue': '#e7e7e7',
      'neutral-900': '#3f51b5',
      'gradiant': 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2.5rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        'primary-dark': '#7c1c25',
        ink: '#1a1612',
        cream: '#faf8f3',
        ivory: '#f4f2ec',
        // brand-aligned warm neutral scale for new design system
        sand: {
          50: '#fafaf7',
          100: '#f4f2ec',
          200: '#e8e4da',
          300: '#d4cfc1',
          400: '#a39d8c',
          500: '#797466',
          600: '#56524a',
          700: '#3b3833',
          800: '#26241f',
          900: '#161412',
        },
      },
      letterSpacing: {
        widest: '0.22em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,16,12,0.04), 0 8px 24px -12px rgba(20,16,12,0.08)',
        lift: '0 20px 40px -20px rgba(20,16,12,0.18)',
        ring: '0 0 0 1px rgba(20,16,12,0.06)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
