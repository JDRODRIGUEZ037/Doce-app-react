import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';
import { HttpError } from '../utils/httpError.js';
import { signToken } from '../utils/jwt.js';

// Consulta la base de datos para encontrar al usuario y sus permisos asociados
export async function login(email, password) {
  const users = await query(
    `SELECT u.id, u.full_name, u.email, u.password_hash, r.code AS role_code, r.name AS role_name,
            r.can_create, r.can_update, r.can_delete, r.can_export, r.can_manage_triggers
       FROM users u
       INNER JOIN roles r ON r.id = u.role_id
       WHERE u.email = :email AND u.is_active = 1`,
    { email }
  );

  if (users.length === 0) {
    throw new HttpError(401, 'Credenciales incorrectas');
  }

  const user = users[0];
  let isValidPassword = false;
  if (user.password_hash.startsWith('$2')) {
    isValidPassword = await bcrypt.compare(password, user.password_hash);
  } else {
    // Permite utilizar contraseñas en texto plano únicamente para ambientes de demostración
    isValidPassword = user.password_hash === password;
  }

  if (!isValidPassword) {
    throw new HttpError(401, 'Credenciales incorrectas');
  }

  const payload = {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    role: user.role_code,
    permissions: {
      can_create: Boolean(user.can_create),
      can_update: Boolean(user.can_update),
      can_delete: Boolean(user.can_delete),
      can_export: Boolean(user.can_export),
      can_manage_triggers: Boolean(user.can_manage_triggers)
    },
    initials: user.full_name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  };

  const token = signToken(payload);
  return { user: payload, token };
}
