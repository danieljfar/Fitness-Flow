import sequelize from '../config/db.js';
import { defineBookingModel } from '../models/Reservation.js';
import { defineClassModel } from '../models/Class.js';
import { defineInstructorModel } from '../models/Instructor.js';
import { defineSlotModel } from '../models/Slot.js';
import { defineUserModel } from '../models/User.js';

const User = defineUserModel(sequelize);
const Instructor = defineInstructorModel(sequelize);
const ClassModel = defineClassModel(sequelize);
const Slot = defineSlotModel(sequelize);
const Booking = defineBookingModel(sequelize);

Instructor.hasMany(ClassModel, { foreignKey: 'instructorId', as: 'classes' });
ClassModel.belongsTo(Instructor, { foreignKey: 'instructorId', as: 'instructor' });

ClassModel.hasMany(Slot, { foreignKey: 'classId', as: 'slots' });
Slot.belongsTo(ClassModel, { foreignKey: 'classId', as: 'class' });

User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Slot.hasMany(Booking, { foreignKey: 'slotId', as: 'bookings' });
Booking.belongsTo(Slot, { foreignKey: 'slotId', as: 'slot' });

export { sequelize, User, Instructor, ClassModel, Slot, Booking };