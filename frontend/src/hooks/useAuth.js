import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

// Hook de conveniencia para consumir el contexto de autenticación
export default function useAuth() {
  return useContext(AuthContext);
}
