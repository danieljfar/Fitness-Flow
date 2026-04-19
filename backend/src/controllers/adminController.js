import {
  createAdminSlotRecord,
  createClassRecord,
  createInstructorRecord,
  getAdminDashboard,
  getAdminSlots,
  getClasses,
  getInstructors,
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
    const instructor = await createInstructorRecord(req.body);
    return res.status(201).json({ instructor });
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
    const classItem = await createClassRecord(req.body);
    return res.status(201).json({ class: classItem });
  } catch (error) {
    return next(error);
  }
}

export async function listAdminSlotsHandler(req, res, next) {
  try {
    const slots = await getAdminSlots();
    return res.json({ slots });
  } catch (error) {
    return next(error);
  }
}

export async function createAdminSlotHandler(req, res, next) {
  try {
    const slot = await createAdminSlotRecord(req.body);
    return res.status(201).json({ slot });
  } catch (error) {
    return next(error);
  }
}
