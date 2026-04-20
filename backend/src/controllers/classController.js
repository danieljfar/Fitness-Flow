import { asyncHandler } from '../utils/asyncHandler.js';
import { listClasses } from '../services/classService.js';

export const getClasses = asyncHandler(async (req, res) => {
  const classes = await listClasses();
  res.json({ classes });
});