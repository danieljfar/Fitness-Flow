import { Router } from 'express';
import {
  assignCreditsHandler,
  createClassReservationHandler,
  createClassHandler,
  createInstructorHandler,
  dashboard,
  deleteClassHandler,
  deleteInstructorHandler,
  deleteReservationHandler,
  listClassReservationsHandler,
  listClassesHandler,
  listInstructorsHandler,
  searchUsersHandler,
  updateClassHandler,
  updateInstructorHandler,
  updateUserCreditsHandler,
} from '../controllers/adminController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/dashboard', dashboard);

router.get('/instructors', listInstructorsHandler);
router.post('/instructors', createInstructorHandler);
router.put('/instructors/:instructorId', updateInstructorHandler);
router.patch('/instructors/:instructorId', updateInstructorHandler);
router.delete('/instructors/:instructorId', deleteInstructorHandler);

router.get('/classes', listClassesHandler);
router.post('/classes', createClassHandler);
router.patch('/classes/:classId', updateClassHandler);
router.delete('/classes/:classId', deleteClassHandler);
router.get('/classes/:classId/reservations', listClassReservationsHandler);
router.post('/classes/:classId/reservations', createClassReservationHandler);

router.delete('/reservations/:reservationId', deleteReservationHandler);

router.get('/users', searchUsersHandler);
router.post('/credits/assign', assignCreditsHandler);
router.patch('/credits/:userId', updateUserCreditsHandler);

export default router;
