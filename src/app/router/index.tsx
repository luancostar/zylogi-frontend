// Em: src/app/router/index.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from '../../features/auth/views/LoginPage'; // Você já tem este
import HomePage from '../../features/auth/views/HomePage';
 import UsersPage from './../../features/auth/views/UsersPage';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// --- 4. Componente para Redirecionamento da Raiz ---
// (Também pode ir para um arquivo separado)
const RootRedirect: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  return <Navigate to={isAuthenticated ? "/home" : "/login"} replace />;
};

// --- Seu Componente AppRouter Modificado ---
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para a página de login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          {/* Adicione outras rotas protegidas aqui, se necessário */}
          {/* Ex: <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Route>
        {/* Rota Raiz: Redireciona com base na autenticação */}
        <Route path="/users" element={<UsersPage />} />

        <Route path="/" element={<RootRedirect />} />
        
        {/* Opcional: Rota "Catch-all" para páginas não encontradas */}
        {/* Esta também pode redirecionar para a RootRedirect ou para uma página 404 dedicada */}
        <Route path="*" element={<RootRedirect />} /> 
        {/* Ou <Route path="*" element={<NotFoundPage />} /> se você tiver uma */}

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;