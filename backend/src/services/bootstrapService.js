import moment from 'moment';
import { countClasses, createClasses } from '../repositories/classRepository.js';

export async function ensureSeedData() {
  const existingClassCount = await countClasses();

  if (existingClassCount > 0) {
    return;
  }

  const startsAtBase = moment().add(1, 'day').startOf('day');
  const demoClasses = [
    { name: 'Strength Lab', startsAt: startsAtBase.clone().hour(8).toDate(), capacity: 12, createdBy: null, updatedBy: null },
    { name: 'Mobility Reset', startsAt: startsAtBase.clone().hour(10).toDate(), capacity: 8, createdBy: null, updatedBy: null },
    { name: 'Lunch HIIT', startsAt: startsAtBase.clone().hour(13).toDate(), capacity: 16, createdBy: null, updatedBy: null },
    { name: 'Evening Recovery', startsAt: startsAtBase.clone().hour(18).toDate(), capacity: 10, createdBy: null, updatedBy: null },
    {
      name: 'Weekend Deep Focus',
      startsAt: startsAtBase.clone().add(1, 'day').hour(9).toDate(),
      capacity: 20,
      createdBy: null,
      updatedBy: null,
    },
  ];

  await createClasses(demoClasses);
}