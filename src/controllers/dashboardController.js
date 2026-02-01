const Transaction = require('../models/Transaction');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const { period = 'month', date } = req.query;
    
    let startDate, endDate;
    const now = date ? new Date(date) : new Date();
    
    if (period === 'week') {
      // Get current week (Monday to Sunday)
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      startDate = new Date(now.setDate(diff));
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (period === 'month') {
      // Get current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    } else if (period === 'year') {
      // Get current year
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    }
    
    // Get income and expense transactions
    const transactions = await Transaction.find({
      date: { $gte: startDate, $lte: endDate }
    });
    
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Category-wise breakdown
    const categoryBreakdown = {};
    transactions.forEach(t => {
      if (!categoryBreakdown[t.category]) {
        categoryBreakdown[t.category] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        categoryBreakdown[t.category].income += t.amount;
      } else {
        categoryBreakdown[t.category].expense += t.amount;
      }
    });
    
    // Division-wise breakdown
    const divisionBreakdown = {
      office: { income: 0, expense: 0 },
      personal: { income: 0, expense: 0 }
    };
    
    transactions.forEach(t => {
      if (t.type === 'income') {
        divisionBreakdown[t.division].income += t.amount;
      } else {
        divisionBreakdown[t.division].expense += t.amount;
      }
    });
    
    res.json({
      period,
      startDate,
      endDate,
      summary: {
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense
      },
      categoryBreakdown,
      divisionBreakdown,
      transactionCount: transactions.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

// Get transaction history with pagination
exports.getTransactionHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const transactions = await Transaction.find()
      .populate('accountId')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Transaction.countDocuments();
    
    res.json({
      transactions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction history', error: error.message });
  }
};
