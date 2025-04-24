/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        neonTilt: ['"Tilt Neon"', 'sans-serif']
      },
      screens: {
        'xs': '380px',
        'bp': '1023px',
        'ap': '1025px',
        'UWQ': '3440px',
      }
    },
  },
  plugins: [],
}
