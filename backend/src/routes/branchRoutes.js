import { Router } from 'express';
import {
  createBranchController,
  deleteBranchController,
  listBranchesController,
  updateBranchController
} from '../controllers/branchController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/permissionMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', listBranchesController);
router.post('/', requirePermission('can_create'), createBranchController);
router.put('/:id', requirePermission('can_update'), updateBranchController);
router.delete('/:id', requirePermission('can_delete'), deleteBranchController);

export default router;
