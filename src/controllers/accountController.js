const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// Get all accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().sort({ name: 1 });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accounts', error: error.message });
  }
};

// Get single account
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    // Get transactions for this account
    const transactions = await Transaction.find({ accountId: req.params.id })
      .sort({ date: -1 })
      .limit(10);
    
    res.json({ account, recentTransactions: transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching account', error: error.message });
  }
};

// Create account
exports.createAccount = async (req, res) => {
  try {
    const { name, balance, type } = req.body;
    
    const account = new Account({ name, balance, type });
    await account.save();
    
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: 'Error creating account', error: error.message });
  }
};

// Update account
exports.updateAccount = async (req, res) => {
  try {
    const { name, type } = req.body;
    
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { name, type },
      { new: true, runValidators: true }
    );
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    res.json(account);
  } catch (error) {
    res.status(400).json({ message: 'Error updating account', error: error.message });
  }
};

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error: error.message });
  }
};

// Transfer between accounts
exports.transferBetweenAccounts = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount, description } = req.body;
    
    if (!fromAccountId || !toAccountId || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    if (amount <= 0) {
      return res.status(400).json({ message: 'Transfer amount must be positive' });
    }
    
    const fromAccount = await Account.findById(fromAccountId);
    const toAccount = await Account.findById(toAccountId);
    
    if (!fromAccount || !toAccount) {
      return res.status(404).json({ message: 'One or both accounts not found' });
    }
    
    if (fromAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance in source account' });
    }
    
    // Update balances
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    
    await fromAccount.save();
    await toAccount.save();
    
    // Create transaction records
    const expenseTransaction = new Transaction({
      type: 'expense',
      amount,
      description: description || `Transfer to ${toAccount.name}`,
      category: 'Transfer',
      division: 'personal',
      accountId: fromAccountId,
      date: new Date()
    });
    
    const incomeTransaction = new Transaction({
      type: 'income',
      amount,
      description: description || `Transfer from ${fromAccount.name}`,
      category: 'Transfer',
      division: 'personal',
      accountId: toAccountId,
      date: new Date()
    });
    
    await expenseTransaction.save();
    await incomeTransaction.save();
    
    res.json({
      message: 'Transfer successful',
      fromAccount,
      toAccount,
      transactions: [expenseTransaction, incomeTransaction]
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing transfer', error: error.message });
  }
};
