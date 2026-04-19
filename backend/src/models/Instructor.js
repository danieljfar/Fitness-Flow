import { DataTypes } from 'sequelize';

export function defineInstructorModel(sequelize) {
  return sequelize.define(
    'Instructor',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(140),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(180),
        allowNull: true,
        unique: true,
      },
      specialty: {
        type: DataTypes.STRING(180),
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      tableName: 'instructors',
    }
  );
}
