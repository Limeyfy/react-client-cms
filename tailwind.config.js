module.exports = {
  purge: [
    './src/components/**/*.tsx',
    './src/components/**/*.styled.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
};