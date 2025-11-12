import app from './app.js';
import { loadEnv } from './utils/loadEnv.js';

// Carga variables de entorno antes de iniciar la aplicación
const env = loadEnv();
const port = env.PORT || 4000;

app.listen(port, () => {
  console.log(`API de marketing escuchando en http://localhost:${port}`);
});
