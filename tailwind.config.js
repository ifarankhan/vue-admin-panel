module.exports = {
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        'montserrat': "'Montserrat','serif'",
      },
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
        psytechBlueBtHover: '#008ac0',
        psytechGrey: '#a2abab',
        psytechDark: "#7E7E7E",
        psytechLight: "#E5E5E5",
        psytechBlack: "#000000",
        psytechLightGray:'#0000001A',
        psytechRed:'#BC2A2A',
        psytechBorderColor: '#ffffff4d',
        psytechBlueDark: "#17a9e1",
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
    scrollbar: ['dark', 'rounded'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ]
}
