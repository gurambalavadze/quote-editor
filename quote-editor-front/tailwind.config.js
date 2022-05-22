module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        blue: "#0F005B",
        bluelight: "#ECEBF1",
        bluelight1: "#2700EC",
        yellow: "#F9B911",
        orange: "#ED5C4E",
      },
      borderRadius: {
        "50xl": "50px",
      },
      boxShadow: {
        box: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      lineHeight: {
        "extra-30": "30px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
