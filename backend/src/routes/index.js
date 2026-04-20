import { Router } from 'express';
import adminRoutes from './adminRoutes.js';
import authRoutes from './authRoutes.js';
import reservationRoutes from './reservationRoutes.js';
import classRoutes from './classRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/classes', classRoutes);
router.use('/bookings', reservationRoutes);
router.use('/reservations', reservationRoutes);

export default router;