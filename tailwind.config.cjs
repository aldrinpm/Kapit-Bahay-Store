/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kapit-primary': '#006400', // Deep Green
        'kapit-secondary': '#FFD700', // Warm Yellow
        'kapit-accent': '#FF8C00', // Orange
        'kapit-background': '#FFF8F0', // Warm Off-White
        'kapit-text': '#36454F', // Dark Charcoal
      },
      // Basic mobile-first design ensures small screens are default
      screens: {
        'sm': '640px', // Example breakpoint
        'md': '768px',
        'lg': '1024px',
      },
    },
  },
  plugins: [],
}