const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Recursive', 'sans-serif'],
    },
    extend: {
      colors: {
        background: colors.gray[300],
        theme: colors.lightBlue[100],
        gray: colors.coolGray[200],
        blue: colors.lightBlue[400],
        white: colors.white,
        darkGrey: colors.gray[800],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
      },
      textColor: {
        accent: 'var(--color-text-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
      },
    },
  },
  darkMode: 'media',
  variants: {},
  plugins: [],
};
