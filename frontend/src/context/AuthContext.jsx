import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient.js';

// Contexto global que mantiene el usuario autenticado y sus privilegios
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Intenta recuperar la sesión almacenada en el almacenamiento local del navegador
  useEffect(() => {
    const storedSession = window.localStorage.getItem('marketing_session');
    if (storedSession) {
      const parsed = JSON.parse(storedSession);
      setUser(parsed.user);
      setToken(parsed.token);
    }
  }, []);

  // Mantiene la sesión sincronizada en el almacenamiento local
  useEffect(() => {
    if (user && token) {
      window.localStorage.setItem('marketing_session', JSON.stringify({ user, token }));
    } else {
      window.localStorage.removeItem('marketing_session');
    }
  }, [user, token]);

  // Función encargada de autenticar al usuario contra el backend
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.post('/auth/login', credentials);
      setUser(data.user);
      setToken(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'No fue posible iniciar sesión');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Cierra la sesión eliminando toda la información almacenada
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    navigate('/login');
  }, [navigate]);

  // Expone una bandera simple para comprobar privilegios específicos
  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    return Boolean(user.permissions?.[permission]);
  }, [user]);

  const value = useMemo(() => ({
    user,
    token,
    login,
    logout,
    loading,
    error,
    hasPermission
  }), [user, token, login, logout, loading, error, hasPermission]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
