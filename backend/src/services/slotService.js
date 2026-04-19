import moment from 'moment';
import { ApiError } from '../utils/apiError.js';
import { findAllSlots } from '../repositories/slotRepository.js';

function serializeSlot(slot) {
  const availableSeats = Math.max(slot.capacity - slot.bookedCount, 0);

  return {
    id: slot.id,
    title: slot.title,
    bikeLabel: slot.bikeLabel,
    startsAt: slot.startsAt,
    startsAtLabel: moment(slot.startsAt).format('YYYY-MM-DD HH:mm'),
    capacity: slot.capacity,
    bookedCount: slot.bookedCount,
    availableSeats,
    status: slot.status,
    isFull: availableSeats === 0,
    class: slot.class
      ? {
          id: slot.class.id,
          name: slot.class.name,
          level: slot.class.level,
          durationMinutes: slot.class.durationMinutes,
          instructor: slot.class.instructor
            ? {
                id: slot.class.instructor.id,
                name: slot.class.instructor.name,
                specialty: slot.class.instructor.specialty,
              }
            : null,
        }
      : null,
    createdAt: slot.createdAt,
    updatedAt: slot.updatedAt,
  };
}

export async function listSlots() {
  const slots = await findAllSlots();
  return slots.map(serializeSlot);
}

export function normalizeSlot(slot) {
  if (!slot) {
    throw new ApiError(404, 'Slot not found');
  }

  return serializeSlot(slot);
}