/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'new-sm': '601px',
        'new-lg': '1280px', // Large screens (laptops)
        'new-xl': '1440px', // Extra large screens (desktops)
        'new-xxl': '1890px', // Extra large screens (desktops)
      },
    },  
  },
  plugins: [import("tailwind-scrollbar")],
};
