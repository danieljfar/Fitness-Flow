import { Credit, User } from '../database/index.js';

const USER_WITH_CREDIT_INCLUDE = [
  {
    model: Credit,
    as: 'credit',
    required: false,
    attributes: ['balance'],
  },
];

export function findUserByEmail(email) {
  return User.findOne({
    where: { email },
    include: USER_WITH_CREDIT_INCLUDE,
  });
}

export function findUserById(userId) {
  return User.findByPk(userId, {
    include: USER_WITH_CREDIT_INCLUDE,
  });
}

export function createUser(userData) {
  return User.create(userData);
}