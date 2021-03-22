/* eslint-disable no-unused-vars */
module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        icon: '1.5rem',
      },
      fontFamily: {
        monument: ['Monument'],
      },
      boxShadow: {
        mdBlue:
          '0 4px 6px -1px rgba(20, 38, 100, 0.1), 0 2px 4px -1px rgba(20, 38, 100, 0.06)',
        xlBlue:
          '0 20px 25px -5px rgba(20, 38, 100, 0.1),  0 10px 10px -5px rgba(20, 38, 100, 0.04)',
        mdGreen:
          '0 4px 6px -1px rgba(0, 230, 179, 0.1), 0 2px 4px -1px rgba(0, 230, 179, 0.06)',
      },
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
          dark: '#028B6D',
        },
      },
      backgroundImage: (theme) => ({
        indexBack: "url('/images/indexBack.png')",
        registerBack: "url('/images/registerBack.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
