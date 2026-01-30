import express from 'express';
import {
  getCategorySummary,
  getDivisionSummary,
} from '../controllers/summaryController.js';

const router = express.Router();

router.get('/categories', getCategorySummary);
router.get('/divisions', getDivisionSummary);

export default router;
