import { Router } from 'express';
import {
  createAdminSlotHandler,
  createClassHandler,
  createInstructorHandler,
  dashboard,
  listAdminSlotsHandler,
  listClassesHandler,
  listInstructorsHandler,
} from '../controllers/adminController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/dashboard', dashboard);

router.get('/instructors', listInstructorsHandler);
router.post('/instructors', createInstructorHandler);

router.get('/classes', listClassesHandler);
router.post('/classes', createClassHandler);

router.get('/slots', listAdminSlotsHandler);
router.post('/slots', createAdminSlotHandler);

export default router;
