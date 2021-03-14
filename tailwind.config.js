/* eslint-disable no-unused-vars */
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      scale: {
        '-1': '-1',
      },
      zIndex: {
        '-1': '-1',
      },
      colors: {
        blueInk: {
          DEFAULT: '#142664',
        },
        wildStrawberry: {
          DEFAULT: '#FF2E93',
        },
        caribbeanGreen: {
          DEFAULT: '#00E6B3',
        },
      },
      backgroundImage: (theme) => ({
        homePage: "url('/images/index.png')",
        indexBack: "url('/images/indexBack.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
