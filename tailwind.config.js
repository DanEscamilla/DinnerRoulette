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
        'begin-rolling': 'rolling 1s ease-in',
        rolling: 'rolling 0.5s linear infinite',
        'end-rolling': 'rolling 5s ease-out',
        'begin-table-bounce': 'table-bounce 1s ease-in',
        'table-bounce': 'table-bounce 1s alternate linear infinite',
        'end-table-bounce': 'table-bounce 5s ease-out',
        'top-btn-border': 'top-border-btn 2s linear 0s infinite normal',
        'bottom-btn-border': 'bottom-border-btn 2s linear 0s infinite normal',
        'right-btn-border': 'right-border-btn 2s linear 0s infinite normal',
        'left-btn-border': 'left-border-btn 2s linear 0s infinite normal',
      },
      keyframes: {
        rolling: {
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
        'top-border-btn': {
          '0%': {
            left: '-100%',
          },
          '40%': {
            left: '100%',
          },
          '100%': {
            left: '100%',
          },
        },
        'right-border-btn': {
          '0%': {
            top: '-100%',
          },
          '20%': {
            top: '-100%',
          },
          '60%': {
            top: '100%',
          },
          '100%': {
            top: '100%',
          },
        },
        'bottom-border-btn': {
          '0%': {
            right: '-100%',
          },
          '40%': {
            right: '-100%',
          },
          '80%': {
            right: '100%',
          },
          '100%': {
            right: '100%',
          },
        },
        'left-border-btn': {
          '0%': {
            bottom: '-100%',
          },
          '60%': {
            bottom: '-100%',
          },
          '100%': {
            bottom: '100%',
          },
        },
      },
    },
  },
  plugins: [],
};
