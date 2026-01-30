import express from 'express';
import { addTransfer, getTransfers } from '../controllers/transferController.js';

const router = express.Router();

router.post('/add', addTransfer);
router.get('/', getTransfers);

export default router;
