import { DataTypes } from 'sequelize';

export function defineCreditModel(sequelize) {
  return sequelize.define(
    'Credit',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        field: 'user_id',
      },
      balance: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
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
      tableName: 'credits',
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
