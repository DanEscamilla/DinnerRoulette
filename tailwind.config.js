module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        warning: '#b15000',
        gold: '#f3aa14',
        primary: {
          DEFAULT: '#1B9D5F',
          50: '#B5F2D5',
          100: '#A4EFCB',
          200: '#81E9B8',
          300: '#5EE4A4',
          400: '#3BDE90',
          500: '#23CD7C',
          600: '#1B9D5F',
          700: '#136D42',
          800: '#0A3D25',
          900: '#020D08',
        },
      },
      animation: {
        draw: 'draw 5s ease-out',
        'table-bounce': 'table-bounce 1s alternate linear 5',
      },
      keyframes: {
        draw: {
          '0%': {
            'stroke-dashoffset': '0',
          },
        },
        'table-bounce': {
          '0%': {
            transform: 'translate(0, 0px)',
          },

          '20%': {
            transform: 'translate(-1px, -2px)',
          },

          '40%': {
            transform: 'translate(-2px, 0)',
          },

          '80%': {
            transform: 'translate(-1px, -4px)',
          },
        },
      },
    },
  },
  plugins: [],
};
