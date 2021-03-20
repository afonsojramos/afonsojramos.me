const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue[100],
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Recursive', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
};
