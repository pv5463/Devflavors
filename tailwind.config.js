// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep Greens (Basil)
        basil: {
          50: "#f2fcf4",
          100: "#e1f8e6",
          200: "#c3eec9",
          300: "#96e0a0",
          400: "#62cc6f",
          500: "#3eb14d",
          600: "#2d9039",
          700: "#257330",
          800: "#215b2a",
          900: "#1c4b25",
          950: "#0e2915",
        },
        // Warm Golds (Turmeric)
        turmeric: {
          50: "#fffdf5",
          100: "#fff8db",
          200: "#ffefb0",
          300: "#ffe17a",
          400: "#ffce43",
          500: "#ffb91a",
          600: "#f59e0b",
          700: "#c27808",
          800: "#9a5f0e",
          900: "#7d4e12",
          950: "#472805",
        },
        // Clean Whites
        cream: {
          50: "#fdfdfc",
          100: "#f9f9f6",
          200: "#f2f2ea",
          300: "#e8e8dc",
          400: "#d9d9c8",
          500: "#c4c4ae",
          600: "#a8a890",
          700: "#878773",
          800: "#707060",
          900: "#5c5c50",
          950: "#31312b",
        },
        // Forbidden/Alert colors
        forbidden: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#ffcaca",
          300: "#fda4a4",
          400: "#fa6f6f",
          500: "#f14141",
          600: "#de2424",
          700: "#bb1a1a",
          800: "#9a1a1a",
          900: "#7f1d1d",
          950: "#450a0a",
        },
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
