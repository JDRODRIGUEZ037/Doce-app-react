import { z } from 'zod';
import { login } from '../services/authService.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
});

// Controlador HTTP para iniciar sesión
export async function loginController(req, res, next) {
  try {
    const payload = loginSchema.parse(req.body);
    const session = await login(payload.email, payload.password);
    res.json(session);
  } catch (error) {
    next(error);
  }
}
