const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// Get all transactions with filters
exports.getAllTransactions = async (req, res) => {
  try {
    const { type, division, category, startDate, endDate, accountId } = req.query;
    
    let filter = {};
    if (type) filter.type = type;
    if (division) filter.division = division;
    if (category) filter.category = category;
    if (accountId) filter.accountId = accountId;
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    const transactions = await Transaction.find(filter)
      .populate('accountId')
      .sort({ date: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

// Get single transaction
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('accountId');
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction', error: error.message });
  }
};

// Create transaction
exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, description, category, division, date, accountId } = req.body;
    
    const transaction = new Transaction({
      type,
      amount,
      description,
      category,
      division,
      date: date || new Date(),
      accountId
    });
    
    await transaction.save();
    
    // Update account balance if accountId provided
    if (accountId) {
      const account = await Account.findById(accountId);
      if (account) {
        if (type === 'income') {
          account.balance += amount;
        } else {
          account.balance -= amount;
        }
        await account.save();
      }
    }
    
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Error creating transaction', error: error.message });
  }
};

// Update transaction (with 12-hour restriction)
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Check if transaction is older than 12 hours
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
    if (transaction.createdAt < twelveHoursAgo) {
      return res.status(403).json({ 
        message: 'Cannot edit transaction. Edit window (12 hours) has expired.' 
      });
    }
    
    const { type, amount, description, category, division, date } = req.body;
    
    // Update account balance if amount or type changed
    if (transaction.accountId && (amount !== transaction.amount || type !== transaction.type)) {
      const account = await Account.findById(transaction.accountId);
      if (account) {
        // Reverse old transaction
        if (transaction.type === 'income') {
          account.balance -= transaction.amount;
        } else {
          account.balance += transaction.amount;
        }
        
        // Apply new transaction
        if (type === 'income') {
          account.balance += amount;
        } else {
          account.balance -= amount;
        }
        await account.save();
      }
    }
    
    transaction.type = type || transaction.type;
    transaction.amount = amount || transaction.amount;
    transaction.description = description || transaction.description;
    transaction.category = category || transaction.category;
    transaction.division = division || transaction.division;
    transaction.date = date || transaction.date;
    
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating transaction', error: error.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Update account balance
    if (transaction.accountId) {
      const account = await Account.findById(transaction.accountId);
      if (account) {
        if (transaction.type === 'income') {
          account.balance -= transaction.amount;
        } else {
          account.balance += transaction.amount;
        }
        await account.save();
      }
    }
    
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
};
