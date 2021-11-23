module.exports = {
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    // fontWeight: {
    //   hairline: 100,
    //   'extra-light': 100,
    //    thin: 200,
    //    light: 300,
    //    normal: 400,
    //    medium: 500,
    //    semibold: 600,
    //    bold: 700,
    //   extrabold: 800,
    //   'extra-bold': 800,
    //    black: 900,
    //  },
    extend: {
      zIndex: {
        '-1': '-1'
      },
      flexGrow: {
        5: '5'
      },
      maxHeight: {
        'screen-menu': 'calc(100vh - 3.5rem)',
        modal: 'calc(100vh - 160px)'
      },
      transitionProperty: {
        position: 'right, left, top, bottom, margin, padding',
        textColor: 'color'
      },
      keyframes: {
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 }
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        }
      },
      animation: {
        fadeOut: 'fadeOut 250ms ease-in-out',
        fadeIn: 'fadeIn 250ms ease-in-out'
      },
      colors: {
        psytechBlue: '#1baae1',
        psytechGrey: '#a2abab',
        psytechBlueActive: '#008ac0',
        psytechBlueHover: '#3db7e6',
        psytechWhite: '#fff',
      }
    },

  },
  variants: {
    extend: {
      margin: ['last'],
      fontWeight: ['last'],
      textColor: ['last']
    },
    scrollbar: ['dark', 'rounded']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ]
}
