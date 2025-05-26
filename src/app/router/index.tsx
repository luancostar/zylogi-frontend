// Exemplo em src/app/router/index.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../features/auth/views/LoginPage';// Usando alias @/ para src/
// Importe outros layouts e páginas

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Outras rotas */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;