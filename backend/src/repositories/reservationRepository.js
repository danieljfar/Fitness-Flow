import { Booking, ClassModel, Instructor } from '../database/index.js';

const CLASS_INCLUDE = {
  model: ClassModel,
  as: 'class',
  include: [
    {
      model: Instructor,
      as: 'instructor',
      attributes: ['id', 'name', 'specialty', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'],
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
    include: [CLASS_INCLUDE],
  });
}

export function findUserBookings(userId) {
  return Booking.findAll({
    where: { userId },
    include: [CLASS_INCLUDE],
    order: [['createdAt', 'DESC']],
  });
}

export function findActiveBooking(userId, classId, transaction) {
  return Booking.findOne({
    where: { userId, classId, status: 'active' },
    transaction,
    lock: transaction?.LOCK?.UPDATE,
  });
}

export function findActiveBookingsByClassId(classId, transaction) {
  return Booking.findAll({
    where: { classId, status: 'active' },
    transaction,
    lock: transaction?.LOCK?.UPDATE,
    include: [CLASS_INCLUDE],
  });
}