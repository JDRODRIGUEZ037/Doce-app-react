import mysql from 'mysql2/promise';
import { loadEnv } from '../utils/loadEnv.js';

const env = loadEnv();

// Crea un pool de conexiones para reutilizar recursos al hablar con MySQL
export const pool = mysql.createPool({
  host: env.DB_HOST,
  port: Number(env.DB_PORT || 3306),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true
});

// Función de ayuda para ejecutar consultas capturando errores
export async function query(sql, params = {}) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
