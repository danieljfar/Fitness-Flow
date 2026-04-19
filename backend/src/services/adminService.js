import {
  createAdminSlot,
  createClass,
  createInstructor,
  getDashboardMetrics,
  listAdminSlots,
  listClasses,
  listInstructors,
} from '../repositories/adminRepository.js';
import { ApiError } from '../utils/apiError.js';

function serializeInstructor(instructor) {
  return {
    id: instructor.id,
    name: instructor.name,
    email: instructor.email,
    specialty: instructor.specialty,
    bio: instructor.bio,
    status: instructor.status,
    createdAt: instructor.createdAt,
    updatedAt: instructor.updatedAt,
  };
}

function serializeClass(classItem) {
  return {
    id: classItem.id,
    name: classItem.name,
    description: classItem.description,
    level: classItem.level,
    durationMinutes: classItem.durationMinutes,
    status: classItem.status,
    instructorId: classItem.instructorId,
    instructor: classItem.instructor
      ? {
          id: classItem.instructor.id,
          name: classItem.instructor.name,
          specialty: classItem.instructor.specialty,
          status: classItem.instructor.status,
        }
      : null,
    createdAt: classItem.createdAt,
    updatedAt: classItem.updatedAt,
  };
}

function serializeSlot(slot) {
  return {
    id: slot.id,
    title: slot.title,
    bikeLabel: slot.bikeLabel,
    startsAt: slot.startsAt,
    capacity: slot.capacity,
    bookedCount: slot.bookedCount,
    status: slot.status,
    classId: slot.classId,
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

export async function getAdminDashboard() {
  return getDashboardMetrics();
}

export async function getInstructors() {
  const instructors = await listInstructors();
  return instructors.map(serializeInstructor);
}

export async function createInstructorRecord(payload) {
  const name = payload?.name?.trim();

  if (!name) {
    throw new ApiError(400, 'Instructor name is required');
  }

  const instructor = await createInstructor({
    name,
    email: payload?.email?.trim() || null,
    specialty: payload?.specialty?.trim() || null,
    bio: payload?.bio?.trim() || null,
    status: payload?.status || 'active',
  });

  return serializeInstructor(instructor);
}

export async function getClasses() {
  const classes = await listClasses();
  return classes.map(serializeClass);
}

export async function createClassRecord(payload) {
  const name = payload?.name?.trim();
  const instructorId = Number(payload?.instructorId);

  if (!name) {
    throw new ApiError(400, 'Class name is required');
  }

  if (!Number.isInteger(instructorId) || instructorId <= 0) {
    throw new ApiError(400, 'Valid instructorId is required');
  }

  const classItem = await createClass({
    name,
    description: payload?.description?.trim() || null,
    level: payload?.level || 'beginner',
    durationMinutes: Number(payload?.durationMinutes) || 45,
    status: payload?.status || 'active',
    instructorId,
  });

  const classes = await listClasses();
  const created = classes.find((item) => item.id === classItem.id);

  return serializeClass(created || classItem);
}

export async function getAdminSlots() {
  const slots = await listAdminSlots();
  return slots.map(serializeSlot);
}

export async function createAdminSlotRecord(payload) {
  const classId = Number(payload?.classId);
  const startsAt = payload?.startsAt;
  const capacity = Number(payload?.capacity);

  if (!Number.isInteger(classId) || classId <= 0) {
    throw new ApiError(400, 'Valid classId is required');
  }

  if (!startsAt || Number.isNaN(Date.parse(startsAt))) {
    throw new ApiError(400, 'Valid startsAt is required');
  }

  if (!Number.isInteger(capacity) || capacity <= 0) {
    throw new ApiError(400, 'Valid capacity is required');
  }

  const slot = await createAdminSlot({
    title: payload?.title?.trim() || 'Cycling Session',
    bikeLabel: payload?.bikeLabel?.trim() || null,
    classId,
    startsAt,
    capacity,
    bookedCount: 0,
    status: payload?.status || 'open',
  });

  const slots = await listAdminSlots();
  const created = slots.find((item) => item.id === slot.id);

  return serializeSlot(created || slot);
}
