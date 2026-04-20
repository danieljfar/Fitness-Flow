import { sequelize } from './index.js';
import { DataTypes } from 'sequelize';

async function ensureClassBookedCountColumn() {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = 'classes';

  const tableDefinition = await queryInterface.describeTable(tableName);
  const hasLegacyBookedCount = Object.prototype.hasOwnProperty.call(tableDefinition, 'bookedCount');
  const hasBookedCount = Object.prototype.hasOwnProperty.call(tableDefinition, 'booked_count');

  if (hasLegacyBookedCount && !hasBookedCount) {
    await queryInterface.renameColumn(tableName, 'bookedCount', 'booked_count');
    return;
  }

  if (hasLegacyBookedCount && hasBookedCount) {
    await queryInterface.removeColumn(tableName, 'bookedCount');
    return;
  }

  if (!hasBookedCount) {
    await queryInterface.addColumn(tableName, 'booked_count', {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    });
  }
}

async function ensureLegacyClassColumnsRemoved() {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = 'classes';
  const tableDefinition = await queryInterface.describeTable(tableName);

  const columnsToRemove = [];

  if (Object.prototype.hasOwnProperty.call(tableDefinition, 'description')) {
    columnsToRemove.push('description');
  }

  if (Object.prototype.hasOwnProperty.call(tableDefinition, 'bikeLabel')) {
    columnsToRemove.push('bikeLabel');
  }

  if (Object.prototype.hasOwnProperty.call(tableDefinition, 'bike_label')) {
    columnsToRemove.push('bike_label');
  }

  for (const columnName of columnsToRemove) {
    await queryInterface.removeColumn(tableName, columnName);
  }
}

async function ensureBookingCreditColumn() {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = 'bookings';
  const tableDefinition = await queryInterface.describeTable(tableName);

  const hasLegacyCreditId = Object.prototype.hasOwnProperty.call(tableDefinition, 'creditId');
  const hasCreditId = Object.prototype.hasOwnProperty.call(tableDefinition, 'credit_id');

  if (hasLegacyCreditId && !hasCreditId) {
    await queryInterface.renameColumn(tableName, 'creditId', 'credit_id');
    return;
  }

  if (hasLegacyCreditId && hasCreditId) {
    await queryInterface.removeColumn(tableName, 'creditId');
    return;
  }

  if (!hasCreditId) {
    await queryInterface.addColumn(tableName, 'credit_id', {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    });

    await sequelize.query(
      `UPDATE bookings b
       INNER JOIN credits c ON c.user_id = b.user_id
       SET b.credit_id = c.id
       WHERE b.credit_id IS NULL`
    );
  }
}

export async function runMigrations() {
  const shouldForce = process.env.DB_SYNC_FORCE === 'true';
  const shouldAlter = process.env.DB_SYNC_ALTER === 'true';

  if (shouldForce) {
    await sequelize.sync({ force: true });
    return;
  }

  if (shouldAlter) {
    await sequelize.sync({ alter: true });
    await ensureClassBookedCountColumn();
    await ensureLegacyClassColumnsRemoved();
    await ensureBookingCreditColumn();
    return;
  }

  await sequelize.sync();
  await ensureClassBookedCountColumn();
  await ensureLegacyClassColumnsRemoved();
  await ensureBookingCreditColumn();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations()
    .then(() => {
      console.log('Database migration completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database migration failed:', error);
      process.exit(1);
    });
}
