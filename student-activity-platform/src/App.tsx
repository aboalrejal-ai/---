import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';
import Dashboard from './views/Dashboard';
import Members from './views/Members';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user ? <Navigate to="/login" /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={<div>صفحة تسجيل الدخول (لاحقًا)</div>} />
      <Route element={<ProtectedRoute />}> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <OutletFallback />;
};

const OutletFallback: React.FC = () => {
  // React Router v7 supports <Outlet>; to keep minimal deps, render children via nested routes.
  return <></>;
};

export default App;
