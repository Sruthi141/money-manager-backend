import express from 'express';
import {
  addTransaction,
  getTransactions,
  getTransactionById,
  editTransaction,
  deleteTransaction,
  filterTransactions,
} from '../controllers/transactionController.js';

const router = express.Router();

router.post('/add', addTransaction);
router.get('/', getTransactions);
router.get('/filter', filterTransactions);
router.get('/:id', getTransactionById);
router.put('/edit/:id', editTransaction);
router.delete('/delete/:id', deleteTransaction);

export default router;
