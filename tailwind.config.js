module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './stories/*'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'limeyfy': {
          '50': '#bee3be',
          '100': '#aedcae',
          '200': '#9dd49d',
          '300': '#8dcd8d',
          '400': '#7dc67d',
          '500': '#6cbf6c',
          '600': '#5cb85c',
          '700': '#53a653',
          '800': '#4a934a',
          '900': '#408140'
        },
        "main": "#1E1F21",
        "main-shade": "#272729"
      }
    },
  },
  variants: {},
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}