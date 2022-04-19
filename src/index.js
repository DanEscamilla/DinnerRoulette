import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import ActionButton from './content_script_app/ActionButton';

const dinnerRouletteRootElement = document.createElement('div');
dinnerRouletteRootElement.setAttribute('id', 'dinner-roulette-root');

document.body.appendChild(dinnerRouletteRootElement);

ReactDOM.render(
  <React.StrictMode>
    <ActionButton />
  </React.StrictMode>,
  dinnerRouletteRootElement
);
