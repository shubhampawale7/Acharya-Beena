/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "deep-space": "#0c0a1e",
        "nebula-purple": "#a855f7",
        starlight: "#f0f2f5",
      },
      fontFamily: {
        sans: ['"Source Sans 3"', "sans-serif"], // Our new body font
        serif: ["Cinzel", "serif"], // Our new heading font
      },
    },
  },
  plugins: [],
};
