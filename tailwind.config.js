/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'capital-blue': '#00669e',
        'safety-red': '#d22e1e',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'institutional': '2.5rem',
      },
    },
  },
  plugins: [],
}
