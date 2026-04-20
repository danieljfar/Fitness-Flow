import { sequelize } from '../database/index.js';
import { emitSocketEvent } from '../config/socket.js';
import { ApiError } from '../utils/apiError.js';
import { createBooking, findActiveBooking, findBookingById, findUserBookings } from '../repositories/reservationRepository.js';
import { findClassById } from '../repositories/classRepository.js';

function serializeBooking(booking) {
  const classItem = booking.class;

  return {
    id: booking.id,
    status: booking.status,
    userId: booking.userId,
    classId: booking.classId,
    externalBookingId: booking.externalBookingId,
    createdBy: booking.createdBy,
    updatedBy: booking.updatedBy,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
    class: classItem
      ? {
          id: classItem.id,
          name: classItem.name,
          description: classItem.description,
          level: classItem.level,
          durationMinutes: classItem.durationMinutes,
          status: classItem.status,
          instructorId: classItem.instructorId,
          createdBy: classItem.createdBy,
          updatedBy: classItem.updatedBy,
          createdAt: classItem.createdAt,
          updatedAt: classItem.updatedAt,
          instructor: classItem.instructor
            ? {
                id: classItem.instructor.id,
                name: classItem.instructor.name,
                specialty: classItem.instructor.specialty,
                createdBy: classItem.instructor.createdBy,
                updatedBy: classItem.instructor.updatedBy,
              }
            : null,
        }
      : null,
  };
}

export async function reserveClass(userId, classId) {
  const transaction = await sequelize.transaction();

  try {
    const classItem = await findClassById(classId, transaction);

    if (!classItem) {
      throw new ApiError(404, 'Class not found');
    }

    const activeBooking = await findActiveBooking(userId, classId, transaction);

    if (activeBooking) {
      throw new ApiError(409, 'You already have an active booking for this class');
    }

    if (classItem.bookedCount >= classItem.capacity) {
      throw new ApiError(409, 'Class is full');
    }

    classItem.bookedCount += 1;
    await classItem.save({ transaction });

    const booking = await createBooking(
      {
        userId,
        classId,
        status: 'active',
        createdBy: userId,
        updatedBy: userId,
      },
      transaction
    );

    await transaction.commit();

    emitSocketEvent('class_updated', {
      classId: classItem.id,
      bookedCount: classItem.bookedCount,
      capacity: classItem.capacity,
    });

    return serializeBooking({
      ...booking.toJSON(),
      class: classItem.toJSON(),
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function cancelReservation(userId, reservationId) {
  const transaction = await sequelize.transaction();

  try {
    const booking = await findBookingById(reservationId, transaction);

    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ApiError(403, 'You cannot cancel this booking');
    }

    if (booking.status === 'cancelled') {
      throw new ApiError(409, 'Booking was already cancelled');
    }

    const classItem = await findClassById(booking.classId, transaction);

    booking.status = 'cancelled';
    booking.updatedBy = userId;
    await booking.save({ transaction });

    if (classItem && classItem.bookedCount > 0) {
      classItem.bookedCount -= 1;
      classItem.updatedBy = userId;
      await classItem.save({ transaction });
    }

    await transaction.commit();

    if (classItem) {
      emitSocketEvent('class_updated', {
        classId: classItem.id,
        bookedCount: classItem.bookedCount,
        capacity: classItem.capacity,
      });
    }

    return serializeBooking({
      ...booking.toJSON(),
      class: classItem ? classItem.toJSON() : booking.class,
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function listReservations(userId) {
  const bookings = await findUserBookings(userId);
  return bookings.map(serializeBooking);
}

export const listBookings = listReservations;