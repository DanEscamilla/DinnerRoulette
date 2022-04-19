import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './popup_app/App';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
