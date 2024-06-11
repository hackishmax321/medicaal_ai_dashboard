/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#45aaf2",
        primaryDark: "#2d98da",
        secondary: "#fed330",
        secondaryDark: "#f7b731",
        primaryFont: "#232323",
        secondaryFont: "#2323223",
        purple: "#a55eea",
        green: "#26de81",
        orange: "#fa550f",
        red: "#eb3b5a",
        white: "#f5f6fa",
        black: "#4b6584",
        shade: "#d1d8e0"
      }
    },
  },
  plugins: [],
}

