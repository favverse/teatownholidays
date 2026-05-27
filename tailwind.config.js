/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        forest: "#1A2A1D",
        tea: "#425B46",
        mist: "#F1E7D8",
        earth: "#5A4333",
        cinematic: "#101010",
        fog: "#E8DFD0",
        bronze: "#8B6914",
      },
      fontFamily: {
        bodoni: ["'Bodoni Moda'", "Georgia", "serif"],
        manrope: ["'Manrope'", "sans-serif"],
        brittany: ["'Pinyon Script'", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
