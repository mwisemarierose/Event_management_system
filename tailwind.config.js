/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DA091F",
        primaryHover: "#ea3c4f",
        secondary: "#173B3F",
        gb: "rgba(0, 0, 0, 0.85)"
      }
    },
  },
  plugins: [],
}

