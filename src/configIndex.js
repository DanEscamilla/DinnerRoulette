import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './popup_app/App';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './helpers/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
