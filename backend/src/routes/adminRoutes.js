import { Router } from 'express';
import {
  createClassHandler,
  createInstructorHandler,
  dashboard,
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

export default router;
