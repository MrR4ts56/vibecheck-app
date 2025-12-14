/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          bg: '#050505',
          card: 'rgba(0,0,0,0.4)',
          border: 'rgba(255,255,255,0.1)',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'IBM Plex Sans Thai', 'sans-serif'],
        serif: ['Playfair Display', 'Noto Serif Thai', 'serif'],
      },
      backdropBlur: {
        'glass': '24px',
      },
    },
  },
  plugins: [],
}
