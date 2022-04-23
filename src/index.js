import React from 'react';
import ReactDOM from 'react-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import ActionButton from './content_script_app/ActionButton';
import './index.css';

const dinnerRouletteRootElement = document.createElement('div');
dinnerRouletteRootElement.setAttribute('id', 'dinner-roulette-root');

document.body.appendChild(dinnerRouletteRootElement);

const theme = createTheme({
  palette: {
    mode: 'dark',
    type: 'dark',
    primary: {
      main: '#1b9d5f',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ActionButton />
    </ThemeProvider>
  </React.StrictMode>,
  dinnerRouletteRootElement
);
