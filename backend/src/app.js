import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { loadEnv } from './utils/loadEnv.js';
import router from './routes/index.js';

// Configura la aplicación Express y middlewares globales
const app = express();
// Asegura que las variables de entorno estén disponibles
loadEnv();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Endpoint de salud para verificar que el backend está vivo
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Prefijo común para todas las rutas de negocio
app.use('/api', router);

// Middleware final para manejar rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
});

// Middleware de manejo de errores controlados
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor'
  });
});

export default app;
