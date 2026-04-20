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
      createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: 'created_by',
      },
      updatedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: 'updated_by',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
      },
    },
    {
      tableName: 'instructors',
      timestamps: false,
      underscored: true,
      hooks: {
        beforeCreate(instance) {
          const now = new Date();
          instance.createdAt = now;
          instance.updatedAt = now;
        },
        beforeUpdate(instance) {
          instance.updatedAt = new Date();
        },
      },
    }
  );
}
