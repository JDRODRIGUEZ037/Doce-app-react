import { query } from '../config/database.js';
import { HttpError } from '../utils/httpError.js';

export async function listProducts() {
  return query(
    `SELECT p.*, c.name AS category_name, v.name AS vendor_name
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     LEFT JOIN vendors v ON v.id = p.vendor_id
     ORDER BY p.updated_at DESC`
  );
}

export async function createProduct(payload) {
  const result = await query(
    `INSERT INTO products (vendor_id, category_id, sku, name, description, price, cost, status)
     VALUES (:vendorId, :categoryId, :sku, :name, :description, :price, :cost, :status)`,
    {
      vendorId: payload.vendorId,
      categoryId: payload.categoryId,
      sku: payload.sku,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      cost: payload.cost,
      status: payload.status || 'active'
    }
  );
  return result.insertId;
}

export async function updateProduct(id, payload) {
  const result = await query(
    `UPDATE products SET vendor_id = :vendorId, category_id = :categoryId, sku = :sku, name = :name,
      description = :description, price = :price, cost = :cost, status = :status
     WHERE id = :id`,
    {
      id,
      vendorId: payload.vendorId,
      categoryId: payload.categoryId,
      sku: payload.sku,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      cost: payload.cost,
      status: payload.status || 'active'
    }
  );
  if (result.affectedRows === 0) {
    throw new HttpError(404, 'Producto no encontrado');
  }
}

export async function deleteProduct(id) {
  const result = await query('DELETE FROM products WHERE id = :id', { id });
  if (result.affectedRows === 0) {
    throw new HttpError(404, 'Producto no encontrado');
  }
}
