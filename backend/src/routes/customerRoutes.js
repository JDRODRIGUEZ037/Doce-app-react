import { Router } from 'express';
import {
  createCustomerController,
  deleteCustomerController,
  listCustomersController,
  updateCustomerController
} from '../controllers/customerController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/permissionMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', listCustomersController);
router.post('/', requirePermission('can_create'), createCustomerController);
router.put('/:id', requirePermission('can_update'), updateCustomerController);
router.delete('/:id', requirePermission('can_delete'), deleteCustomerController);

export default router;
