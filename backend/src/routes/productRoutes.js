import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  listProductsController,
  updateProductController
} from '../controllers/productController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/permissionMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', listProductsController);
router.post('/', requirePermission('can_create'), createProductController);
router.put('/:id', requirePermission('can_update'), updateProductController);
router.delete('/:id', requirePermission('can_delete'), deleteProductController);

export default router;
