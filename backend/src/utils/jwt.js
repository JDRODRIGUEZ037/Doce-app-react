import jwt from 'jsonwebtoken';
import { loadEnv } from './loadEnv.js';

const env = loadEnv();

// Genera un token JWT con los datos mínimos del usuario
export function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

// Verifica y decodifica un token JWT recibido desde el cliente
export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}
