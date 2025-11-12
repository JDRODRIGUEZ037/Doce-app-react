import { Router } from 'express';
import authRoutes from './authRoutes.js';
import branchRoutes from './branchRoutes.js';
import customerRoutes from './customerRoutes.js';
import productRoutes from './productRoutes.js';
import publicationRoutes from './publicationRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/branches', branchRoutes);
router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/publications', publicationRoutes);

export default router;
