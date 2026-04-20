import { Credit } from '../database/index.js';

export function findCreditById(creditId, transaction, lockForUpdate = false) {
  return Credit.findByPk(creditId, {
    transaction,
    lock: lockForUpdate ? transaction?.LOCK?.UPDATE : undefined,
  });
}

export function findCreditByUserId(userId, transaction, lockForUpdate = false) {
  return Credit.findOne({
    where: { userId },
    transaction,
    lock: lockForUpdate ? transaction?.LOCK?.UPDATE : undefined,
  });
}

export async function findOrCreateCreditByUserId(userId, actorId, transaction, lockForUpdate = false) {
  const [credit] = await Credit.findOrCreate({
    where: { userId },
    defaults: {
      userId,
      balance: 0,
      createdBy: actorId ?? null,
      updatedBy: actorId ?? null,
    },
    transaction,
  });

  if (!lockForUpdate) {
    return credit;
  }

  return findCreditByUserId(userId, transaction, true);
}
