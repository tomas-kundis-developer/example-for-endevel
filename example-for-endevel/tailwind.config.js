/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      brand: {
        'component-bg': '#ffffff',
        'layout-bg': '#eaeef2',
        green: {
          DEFAULT: '#00bd7e',
          light: '#33ca98',
          light2: '#ccf2e5',
        },
        link: {
          DEFAULT: '#00bd7e',
          light: '#99e5dc',
        },
      },
      'slider-btn-primary': '#fafafa',
      'slider-btn-secondary': '#3b82f6',
      gray: {
        DEFAULT: '#828282',
        light: '#f7f7f7',
      },
      white: '#ffffff',
    },
    container: {
      // center container class by default
      // (you don't have to use class="container mx-auto", but just class="container")
      center: true,
      // default horizontal padding for container class
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {},
  },
  plugins: [],
};
