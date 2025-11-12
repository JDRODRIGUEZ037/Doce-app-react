import { query } from '../config/database.js';
import { HttpError } from '../utils/httpError.js';

export async function listCustomers() {
  return query('SELECT * FROM customers ORDER BY updated_at DESC');
}

export async function createCustomer(payload) {
  const result = await query(
    `INSERT INTO customers (full_name, email, phone, document_id)
     VALUES (:fullName, :email, :phone, :documentId)`,
    {
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      documentId: payload.documentId
    }
  );
  return result.insertId;
}

export async function updateCustomer(id, payload) {
  const result = await query(
    `UPDATE customers SET full_name = :fullName, email = :email, phone = :phone, document_id = :documentId
     WHERE id = :id`,
    {
      id,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      documentId: payload.documentId
    }
  );
  if (result.affectedRows === 0) {
    throw new HttpError(404, 'Cliente no encontrado');
  }
}

export async function deleteCustomer(id) {
  const result = await query('DELETE FROM customers WHERE id = :id', { id });
  if (result.affectedRows === 0) {
    throw new HttpError(404, 'Cliente no encontrado');
  }
}
