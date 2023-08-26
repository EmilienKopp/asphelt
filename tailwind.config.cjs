const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte 
        primary: { // orange-ish
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        },
        secondary: { // lime-ish
          50: '#F7FDF2',
          100: '#F0FCE6',
          200: '#D9F8C1',
          300: '#C1F29B',
          400: '#92E84F',
          500: '#63DD03',
          600: '#5AC102',
          700: '#4C9A02',
          800: '#3E7501',
          900: '#335F01'
        },
      }
    }
  }
};

module.exports = config;