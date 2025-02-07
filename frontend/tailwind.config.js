/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-top': '0 -5px 10px -3px rgba(0, 0, 0, 0.2)', // Custom shadow on top
      },
    },
  },
  plugins: [],
}