/* eslint-disable no-unused-vars */
module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'screen-80': '80vh',
        'screen-90': '90vh',
        'screen-95': '95vh',
      },
      width: {
        'screen-80': '80vh',
        'screen-90': '90vh',
        'screen-95': '95vh',
      },
      inset: {
        '55perC': '55%',
        '62perC': '62%',
      },
      maxWidth: {
        icon: '1.5rem',
        cardIcon: '6rem',
      },
      minWidth: {
        icon: '1.5rem',
        cardIcon: '6rem',
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
        11: '11',
        '-1': '-1',
      },
      colors: {
        blueInk: {
          light: '#5D74C4',
          DEFAULT: '#142664',
        },
        wildStrawberry: {
          light: '#ff77b9',
          DEFAULT: '#FF2E93',
          dark: '#9a1d59',
        },
        caribbeanGreen: {
          DEFAULT: '#00E6B3',
          dark: '#028B6D',
        },
        error: {
          DEFAULT: '#ff2e59',
          dark: '#d2133a',
        },
      },
      backgroundImage: (theme) => ({
        indexBack: "url('/images/indexBack.png')",
        registerBack: "url('/images/registerBack.png')",
        dashboardBack: "url('/images/dashboardBack.png')",
      }),
      screens: {
        'hover-hover': { raw: '(hover: hover)' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
