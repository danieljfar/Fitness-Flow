import { Booking, ClassModel, Instructor, Slot, User, sequelize } from '../database/index.js';

const CLASS_INCLUDES = [
  {
    model: Instructor,
    as: 'instructor',
    attributes: ['id', 'name', 'specialty', 'status'],
  },
];

const SLOT_INCLUDES = [
  {
    model: ClassModel,
    as: 'class',
    attributes: ['id', 'name', 'level', 'durationMinutes', 'status'],
    include: CLASS_INCLUDES,
  },
];

export function listInstructors() {
  return Instructor.findAll({ order: [['name', 'ASC']] });
}

export function createInstructor(data) {
  return Instructor.create(data);
}

export function listClasses() {
  return ClassModel.findAll({
    include: CLASS_INCLUDES,
    order: [['createdAt', 'DESC']],
  });
}

export function createClass(data) {
  return ClassModel.create(data);
}

export function listAdminSlots() {
  return Slot.findAll({
    include: SLOT_INCLUDES,
    order: [['startsAt', 'ASC']],
  });
}

export function createAdminSlot(data) {
  return Slot.create(data);
}

export async function getDashboardMetrics() {
  const [users, instructors, classes, slots, activeBookings, seatStats] = await Promise.all([
    User.count(),
    Instructor.count(),
    ClassModel.count(),
    Slot.count(),
    Booking.count({ where: { status: 'active' } }),
    Slot.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('capacity')), 'totalCapacity'],
        [sequelize.fn('SUM', sequelize.col('bookedCount')), 'totalBooked'],
      ],
      raw: true,
    }),
  ]);

  const totalCapacity = Number(seatStats?.[0]?.totalCapacity || 0);
  const totalBooked = Number(seatStats?.[0]?.totalBooked || 0);

  return {
    users,
    instructors,
    classes,
    slots,
    activeBookings,
    totalCapacity,
    totalBooked,
    occupancyRate: totalCapacity > 0 ? Number(((totalBooked / totalCapacity) * 100).toFixed(2)) : 0,
  };
}
