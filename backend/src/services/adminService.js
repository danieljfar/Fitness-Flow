import {
  createClass,
  createInstructor,
  getDashboardMetrics,
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
    createdBy: instructor.createdBy,
    updatedBy: instructor.updatedBy,
    createdAt: instructor.createdAt,
    updatedAt: instructor.updatedAt,
  };
}

function serializeClass(classItem) {
  const instructor = classItem.instructor || null;

  return {
    id: classItem.id,
    title: classItem.name,
    name: classItem.name,
    description: classItem.description,
    bikeLabel: classItem.bikeLabel,
    startsAt: classItem.startsAt,
    level: classItem.level,
    durationMinutes: classItem.durationMinutes,
    capacity: classItem.capacity,
    bookedCount: classItem.bookedCount,
    status: classItem.status,
    instructorId: classItem.instructorId,
    createdBy: classItem.createdBy,
    updatedBy: classItem.updatedBy,
    classId: classItem.id,
    instructor: instructor
      ? {
          id: instructor.id,
          name: instructor.name,
          specialty: instructor.specialty,
          status: instructor.status,
          createdBy: instructor.createdBy,
          updatedBy: instructor.updatedBy,
        }
      : null,
    createdAt: classItem.createdAt,
    updatedAt: classItem.updatedAt,
  };
}

export async function getAdminDashboard() {
  return getDashboardMetrics();
}

export async function getInstructors() {
  const instructors = await listInstructors();
  return instructors.map(serializeInstructor);
}

export async function createInstructorRecord(payload, actorId) {
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
    createdBy: actorId ?? null,
    updatedBy: actorId ?? null,
  });

  return serializeInstructor(instructor);
}

export async function getClasses() {
  const classes = await listClasses();
  return classes.map(serializeClass);
}

export async function createClassRecord(payload, actorId) {
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
    status: payload?.status || 'open',
    instructorId,
    createdBy: actorId ?? null,
    updatedBy: actorId ?? null,
    bikeLabel: payload?.bikeLabel?.trim() || null,
    startsAt: payload?.startsAt || null,
    capacity: Number(payload?.capacity) || null,
    bookedCount: Number(payload?.bookedCount) || 0,
  });

  const classes = await listClasses();
  const created = classes.find((item) => item.id === classItem.id);

  return serializeClass(created || classItem);
}
