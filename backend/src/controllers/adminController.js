import {
  assignCreditsToUser,
  cancelClassRecord,
  cancelReservationByAdminRecord,
  createReservationForUserRecord,
  createClassRecord,
  createInstructorRecord,
  deleteInstructorRecord,
  getClassReservations,
  getAdminDashboard,
  getClasses,
  getInstructors,
  searchUsersForAdmin,
  updateUserCreditsRecord,
  updateClassRecord,
  updateInstructorRecord,
} from '../services/adminService.js';

export async function dashboard(req, res, next) {
  try {
    const metrics = await getAdminDashboard();
    return res.json({ metrics });
  } catch (error) {
    return next(error);
  }
}

export async function listInstructorsHandler(req, res, next) {
  try {
    const instructors = await getInstructors();
    return res.json({ instructors });
  } catch (error) {
    return next(error);
  }
}

export async function createInstructorHandler(req, res, next) {
  try {
    const instructor = await createInstructorRecord(req.body, req.user.id);
    return res.status(201).json({ instructor });
  } catch (error) {
    return next(error);
  }
}

export async function updateInstructorHandler(req, res, next) {
  try {
    const instructor = await updateInstructorRecord(req.params.instructorId, req.body, req.user.id);
    return res.json({ instructor });
  } catch (error) {
    return next(error);
  }
}

export async function deleteInstructorHandler(req, res, next) {
  try {
    await deleteInstructorRecord(req.params.instructorId);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

export async function listClassesHandler(req, res, next) {
  try {
    const classes = await getClasses();
    return res.json({ classes });
  } catch (error) {
    return next(error);
  }
}

export async function createClassHandler(req, res, next) {
  try {
    const classItem = await createClassRecord(req.body, req.user.id);
    return res.status(201).json({ class: classItem });
  } catch (error) {
    return next(error);
  }
}

export async function updateClassHandler(req, res, next) {
  try {
    const classItem = await updateClassRecord(req.params.classId, req.body, req.user.id);
    return res.json({ class: classItem });
  } catch (error) {
    return next(error);
  }
}

export async function deleteClassHandler(req, res, next) {
  try {
    const result = await cancelClassRecord(req.params.classId, req.user.id);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

export async function listClassReservationsHandler(req, res, next) {
  try {
    const reservations = await getClassReservations(req.params.classId);
    return res.json({ reservations });
  } catch (error) {
    return next(error);
  }
}

export async function createClassReservationHandler(req, res, next) {
  try {
    const result = await createReservationForUserRecord(req.params.classId, req.body.userId, req.user.id);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

export async function deleteReservationHandler(req, res, next) {
  try {
    const result = await cancelReservationByAdminRecord(req.params.reservationId, req.user.id);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

export async function searchUsersHandler(req, res, next) {
  try {
    const users = await searchUsersForAdmin(req.query.q || '');
    return res.json({ users });
  } catch (error) {
    return next(error);
  }
}

export async function assignCreditsHandler(req, res, next) {
  try {
    const user = await assignCreditsToUser(req.body, req.user.id);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
}

export async function updateUserCreditsHandler(req, res, next) {
  try {
    const user = await updateUserCreditsRecord(req.params.userId, req.body, req.user.id);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
}
