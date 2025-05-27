// src/app/App.tsx
import React from 'react';
import AppRouter from './app/router'; // Ajuste o caminho se necessário
import './index.css'; 
import 'preline';

const App: React.FC = () => {
  return (
    <AppRouter />
  );
}

export default App;

