import { Booking, ClassModel, Instructor, Slot } from '../database/index.js';

const SLOT_INCLUDE = {
  model: Slot,
  as: 'slot',
  include: [
    {
      model: ClassModel,
      as: 'class',
      attributes: ['id', 'name', 'level', 'durationMinutes'],
      include: [
        {
          model: Instructor,
          as: 'instructor',
          attributes: ['id', 'name', 'specialty'],
        },
      ],
    },
  ],
};

export function createBooking(bookingData, transaction) {
  return Booking.create(bookingData, { transaction });
}

export function findBookingById(bookingId, transaction) {
  return Booking.findByPk(bookingId, {
    transaction,
    lock: transaction?.LOCK?.UPDATE,
    include: [SLOT_INCLUDE],
  });
}

export function findUserBookings(userId) {
  return Booking.findAll({
    where: { userId },
    include: [SLOT_INCLUDE],
    order: [['createdAt', 'DESC']],
  });
}

export function findActiveBooking(userId, slotId, transaction) {
  return Booking.findOne({
    where: { userId, slotId, status: 'active' },
    transaction,
    lock: transaction?.LOCK?.UPDATE,
  });
}