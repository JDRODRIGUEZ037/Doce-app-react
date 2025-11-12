import { z } from 'zod';
import {
  createCustomer,
  deleteCustomer,
  listCustomers,
  updateCustomer
} from '../services/customerService.js';

const customerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  documentId: z.string().optional()
});

export async function listCustomersController(req, res, next) {
  try {
    const items = await listCustomers();
    res.json({ items });
  } catch (error) {
    next(error);
  }
}

export async function createCustomerController(req, res, next) {
  try {
    const payload = customerSchema.parse(req.body);
    const id = await createCustomer(payload);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
}

export async function updateCustomerController(req, res, next) {
  try {
    const payload = customerSchema.parse(req.body);
    await updateCustomer(Number(req.params.id), payload);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    next(error);
  }
}

export async function deleteCustomerController(req, res, next) {
  try {
    await deleteCustomer(Number(req.params.id));
    res.json({ message: 'Eliminado' });
  } catch (error) {
    next(error);
  }
}
