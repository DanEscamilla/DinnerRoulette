import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';

import ActionButton from './content_script_app/ActionButton';
import { theme } from './helpers/theme';
import './index.css';

const dinnerRouletteRootElement = document.createElement('div');
dinnerRouletteRootElement.setAttribute('id', 'dinner-roulette-root');

document.body.appendChild(dinnerRouletteRootElement);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ActionButton />
    </ThemeProvider>
  </React.StrictMode>,
  dinnerRouletteRootElement
);
