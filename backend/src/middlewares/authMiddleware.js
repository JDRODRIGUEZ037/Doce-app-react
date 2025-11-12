import { verifyToken } from '../utils/jwt.js';
import { HttpError } from '../utils/httpError.js';

// Middleware que valida el encabezado Authorization y adjunta el usuario al request
export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return next(new HttpError(401, 'Token no proporcionado'));
  }

  const [, token] = header.split(' ');
  try {
    const payload = verifyToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    return next(new HttpError(401, 'Token inválido'));
  }
}
