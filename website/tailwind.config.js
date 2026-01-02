/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['BodyFont', 'sans-serif'],
        header: ['HeaderFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
