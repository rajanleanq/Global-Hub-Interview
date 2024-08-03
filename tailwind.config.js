/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sky-gradient": "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        "dark-blue-gradient": "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
        'white-gradient':"linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)"
      },
    },
  },
  plugins: [],
};
