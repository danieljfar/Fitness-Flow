import moment from 'moment';
import { ApiError } from '../utils/apiError.js';
import { findAllClasses } from '../repositories/classRepository.js';

function serializeClass(classItem) {
  const availableSeats = Math.max(classItem.capacity - classItem.bookedCount, 0);

  return {
    id: classItem.id,
    title: classItem.name,
    name: classItem.name,
    bikeLabel: classItem.bikeLabel,
    startsAt: classItem.startsAt,
    startsAtLabel: moment(classItem.startsAt).format('YYYY-MM-DD HH:mm'),
    capacity: classItem.capacity,
    bookedCount: classItem.bookedCount,
    availableSeats,
    status: classItem.status,
    isFull: availableSeats === 0,
    createdBy: classItem.createdBy,
    updatedBy: classItem.updatedBy,
    classId: classItem.id,
    class: {
      id: classItem.id,
      name: classItem.name,
      level: classItem.level,
      durationMinutes: classItem.durationMinutes,
      createdBy: classItem.createdBy,
      updatedBy: classItem.updatedBy,
      instructor: classItem.instructor
        ? {
            id: classItem.instructor.id,
            name: classItem.instructor.name,
            specialty: classItem.instructor.specialty,
            createdBy: classItem.instructor.createdBy,
            updatedBy: classItem.instructor.updatedBy,
          }
        : null,
    },
    createdAt: classItem.createdAt,
    updatedAt: classItem.updatedAt,
  };
}

export async function listClasses() {
  const classes = await findAllClasses();
  return classes.map(serializeClass);
}

export function normalizeClass(classItem) {
  if (!classItem) {
    throw new ApiError(404, 'Class not found');
  }

  return serializeClass(classItem);
}