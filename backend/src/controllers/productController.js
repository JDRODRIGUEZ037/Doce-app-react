import { z } from 'zod';
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct
} from '../services/productService.js';

const productSchema = z.object({
  vendorId: z.number().int().positive(),
  categoryId: z.number().int().positive(),
  sku: z.string().min(3),
  name: z.string().min(3),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  cost: z.number().nonnegative().optional(),
  status: z.enum(['draft', 'active', 'archived']).optional()
});

export async function listProductsController(req, res, next) {
  try {
    const items = await listProducts();
    res.json({ items });
  } catch (error) {
    next(error);
  }
}

export async function createProductController(req, res, next) {
  try {
    const payload = productSchema.parse({
      ...req.body,
      vendorId: Number(req.body.vendorId),
      categoryId: Number(req.body.categoryId),
      price: Number(req.body.price),
      cost: req.body.cost ? Number(req.body.cost) : undefined
    });
    const id = await createProduct(payload);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
}

export async function updateProductController(req, res, next) {
  try {
    const payload = productSchema.parse({
      ...req.body,
      vendorId: Number(req.body.vendorId),
      categoryId: Number(req.body.categoryId),
      price: Number(req.body.price),
      cost: req.body.cost ? Number(req.body.cost) : undefined
    });
    await updateProduct(Number(req.params.id), payload);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    next(error);
  }
}

export async function deleteProductController(req, res, next) {
  try {
    await deleteProduct(Number(req.params.id));
    res.json({ message: 'Eliminado' });
  } catch (error) {
    next(error);
  }
}
