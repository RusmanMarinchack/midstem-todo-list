import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';

import 'normalize.css';

import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`


* {
  box-sizing: border-box;
}

button {
  cursor: pointer;
}

body {
  font-family: sans-serif;
}
`

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <GlobalStyled />
    <App />
  </>
);