import dotenv from 'dotenv';

let cache;

// Carga las variables de entorno una única vez para reutilizarlas
export function loadEnv() {
  if (!cache) {
    dotenv.config();
    cache = {
      PORT: process.env.PORT,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME,
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '8h'
    };
  }
  return cache;
}
