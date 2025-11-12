import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import useAuth from '../hooks/useAuth.js';
import Campaigns from './Campaigns.jsx';
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import Publications from './Publications.jsx';

// Ruta protegida que solo muestra el contenido si el usuario tiene sesión
function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={(
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          )}
        >
          <Route index element={<Dashboard />} />
          <Route path="campanas" element={<Campaigns />} />
          <Route path="publicaciones" element={<Publications />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
