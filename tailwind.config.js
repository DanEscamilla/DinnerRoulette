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
        'begin-rolling': 'rolling 0.5s linear',
        rolling: 'rolling 0.5s linear infinite',
        'end-rolling': 'rolling 0.5s linear',
        pulse: 'pulse 2s cubic-bezier(.5,.5,0,1) 0s infinite normal',
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
        pulse: {
          '0%': {
            opacity: '0.4',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};
