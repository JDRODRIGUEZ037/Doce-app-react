import { z } from 'zod';
import {
  createBranch,
  deleteBranch,
  listBranches,
  updateBranch
} from '../services/branchService.js';

const branchSchema = z.object({
  code: z.string().min(2),
  name: z.string().min(3),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  addressId: z.number().int().positive().optional(),
  isActive: z.boolean().optional()
});

export async function listBranchesController(req, res, next) {
  try {
    const items = await listBranches();
    res.json({ items });
  } catch (error) {
    next(error);
  }
}

export async function createBranchController(req, res, next) {
  try {
    const payload = branchSchema.parse({
      ...req.body,
      addressId: req.body.addressId ? Number(req.body.addressId) : undefined,
      isActive: req.body.isActive !== undefined ? Boolean(req.body.isActive) : true
    });
    const id = await createBranch(payload);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
}

export async function updateBranchController(req, res, next) {
  try {
    const payload = branchSchema.parse({
      ...req.body,
      addressId: req.body.addressId ? Number(req.body.addressId) : undefined,
      isActive: req.body.isActive !== undefined ? Boolean(req.body.isActive) : true
    });
    await updateBranch(Number(req.params.id), payload);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    next(error);
  }
}

export async function deleteBranchController(req, res, next) {
  try {
    await deleteBranch(Number(req.params.id));
    res.json({ message: 'Eliminado' });
  } catch (error) {
    next(error);
  }
}
