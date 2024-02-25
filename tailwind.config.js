/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        ricky: {
          DEFAULT: "#A7CB54",
          100: "#A7CB54",
          200: "#5CAD4A",
        },
        danger: {
          DEFAULT: "#e4a788",
        },
      },
    },
  },
  plugins: [],
};
