import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  /* eslint-disable react/jsx-filename-extension */
  hydrateRoot(rootElement, <App />);
} else {
  const root = createRoot(rootElement);
  root.render(
    <App />,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
