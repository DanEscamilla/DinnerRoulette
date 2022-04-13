module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        warning: '#b15000',
        gold: '#f3aa14',
        primary: '#178752',
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
