import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Seu CSS principal
import 'preline';    // <--- ESSA LINHA É CRUCIAL
import 'preline/preline';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);