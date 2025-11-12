import { HttpError } from '../utils/httpError.js';

// Comprueba si el usuario autenticado posee un permiso específico
export function requirePermission(permissionKey) {
  return (req, res, next) => {
    const permissions = req.user?.permissions || {};
    if (!permissions[permissionKey]) {
      return next(new HttpError(403, 'No tienes privilegios para realizar esta acción'));
    }
    return next();
  };
}
