import axios from 'axios';

// Cliente HTTP preconfigurado para reutilizar la URL base del backend
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

// Interceptor que agrega el token JWT a cada petición cuando existe sesión
apiClient.interceptors.request.use((config) => {
  const storedSession = window.localStorage.getItem('marketing_session');
  if (storedSession) {
    const { token } = JSON.parse(storedSession);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default apiClient;
