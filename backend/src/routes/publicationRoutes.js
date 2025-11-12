import { Router } from 'express';
import {
  createPublicationController,
  deletePublicationController,
  exportPublicationsController,
  listPublicationsController,
  updatePublicationController
} from '../controllers/publicationController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/permissionMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', listPublicationsController);
router.get('/export', requirePermission('can_export'), exportPublicationsController);
router.post('/', requirePermission('can_create'), createPublicationController);
router.put('/:id', requirePermission('can_update'), updatePublicationController);
router.delete('/:id', requirePermission('can_delete'), deletePublicationController);

export default router;
