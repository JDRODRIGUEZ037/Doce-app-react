import { query } from '../config/database.js';
import { HttpError } from '../utils/httpError.js';

export async function listBranches() {
  return query(
    `SELECT b.*, a.city, a.state
     FROM branches b
     LEFT JOIN addresses a ON a.id = b.address_id
     ORDER BY b.updated_at DESC`
  );
}

export async function createBranch(payload) {
  const result = await query(
    `INSERT INTO branches (code, name, phone, email, address_id, is_active)
     VALUES (:code, :name, :phone, :email, :addressId, :isActive)`,
    {
      code: payload.code,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      addressId: payload.addressId,
      isActive: payload.isActive ? 1 : 0
    }
  );
  return result.insertId;
}

export async function updateBranch(id, payload) {
  const result = await query(
    `UPDATE branches SET code = :code, name = :name, phone = :phone, email = :email, address_id = :addressId, is_active = :isActive
     WHERE id = :id`,
    {
      id,
      code: payload.code,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      addressId: payload.addressId,
      isActive: payload.isActive ? 1 : 0
    }
  );
  if (result.affectedRows === 0) {
    throw new HttpError(404, 'Sucursal no encontrada');
  }
}

export async function deleteBranch(id) {
  const result = await query('DELETE FROM branches WHERE id = :id', { id });
  if (result.affectedRows === 0) {
    throw new HttpError(404, 'Sucursal no encontrada');
  }
}
