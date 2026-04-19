import { ClassModel, Instructor, Slot } from '../database/index.js';

const SLOT_INCLUDES = [
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
];

export function findAllSlots() {
  return Slot.findAll({
    include: SLOT_INCLUDES,
    order: [['startsAt', 'ASC']],
  });
}

export function findSlotById(slotId, transaction) {
  const include = transaction ? undefined : SLOT_INCLUDES;

  return Slot.findByPk(slotId, {
    include,
    transaction,
    lock: transaction?.LOCK?.UPDATE,
  });
}

export function createSlots(slots) {
  return Slot.bulkCreate(slots);
}

export function createSlot(slotData) {
  return Slot.create(slotData);
}

export function countSlots() {
  return Slot.count();
}