module.exports = {
  theme: {
    extend: {
      colors: {
        buttonBlue: '#02baff',
        yellowLight: '#ffbb39',
        yellowDark: '#faa401',
        fastRepair: '#171717',
      },
      scale: {
        99: '.99',
        98: '.98',
      },

    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    screens: {
      xs: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1920px',
      '3xl': '2560px',
      payPalButton: '700px',
    },
    listStyleType: {
      decimal: 'decimal',
    },
  },
  fontFamily: {
    sans: ['Roboto', 'sans-serif'],
  },
  variants: ['responsive', 'group-hover', 'focus-within', 'first', 'last', 'odd', 'even', 'hover', 'focus', 'active', 'visited', 'disabled'],
  plugins: [],
  purge: ['**/*.vue'],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}
