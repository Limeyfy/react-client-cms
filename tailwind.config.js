module.exports = {
  mode: "jit",
  content: [
    './src/**/*.tsx',
    './src/**/*.styled.tsx',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
};