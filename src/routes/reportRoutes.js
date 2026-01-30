import express from 'express';
import {
  getWeeklyReport,
  getMonthlyReport,
  getYearlyReport,
} from '../controllers/reportController.js';

const router = express.Router();

router.get('/weekly', getWeeklyReport);
router.get('/monthly', getMonthlyReport);
router.get('/yearly', getYearlyReport);

export default router;
