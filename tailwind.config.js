/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        bs: {
          font_primary: "#5F5D5D",
          primary: "#FFAB2A",
          secondary: "#29C4B4",
          tertiary: "#F6FAFF",
          outline: "#C4C4C4",
        },
        bsHome: {
          primary: "#1CBFC0",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        primaryimage: "url('/images/bengkel-sampah-bg.png')",
      },
    },
  },
  plugins: [],
});
