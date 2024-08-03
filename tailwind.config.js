/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs:'0px',
      sm: "500px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "sky-gradient": "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        "dark-blue-gradient":
          "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);",
        "white-gradient": "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)",
      },
    },
  },
  plugins: [],
};
