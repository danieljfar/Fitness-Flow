import sequelize from '../config/db.js';
import { defineCreditModel } from '../models/Credit.js';
import { defineBookingModel } from '../models/Reservation.js';
import { defineClassModel } from '../models/Class.js';
import { defineInstructorModel } from '../models/Instructor.js';
import { defineUserModel } from '../models/User.js';

const User = defineUserModel(sequelize);
const Credit = defineCreditModel(sequelize);
const Instructor = defineInstructorModel(sequelize);
const ClassModel = defineClassModel(sequelize);
const Booking = defineBookingModel(sequelize);

Instructor.hasMany(ClassModel, { foreignKey: 'instructorId', as: 'classes' });
ClassModel.belongsTo(Instructor, { foreignKey: 'instructorId', as: 'instructor' });

ClassModel.belongsTo(User, { foreignKey: 'createdBy', as: 'createdByUser' });
ClassModel.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' });
Instructor.belongsTo(User, { foreignKey: 'createdBy', as: 'createdByUser' });
Instructor.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' });

User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Credit, { foreignKey: 'userId', as: 'credit' });
Credit.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Credit.hasMany(Booking, { foreignKey: 'creditId', as: 'bookings' });
Booking.belongsTo(Credit, { foreignKey: 'creditId', as: 'credit' });

Credit.belongsTo(User, { foreignKey: 'createdBy', as: 'createdByUser' });
Credit.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' });

Booking.belongsTo(User, { foreignKey: 'createdBy', as: 'createdByUser' });
Booking.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' });

ClassModel.hasMany(Booking, { foreignKey: 'classId', as: 'bookings' });
Booking.belongsTo(ClassModel, { foreignKey: 'classId', as: 'class' });

export { sequelize, User, Credit, Instructor, ClassModel, Booking };