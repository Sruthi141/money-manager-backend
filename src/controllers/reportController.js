import Transaction from '../models/Transaction.js';

// Helper function to get date range
const getDateRange = (period) => {
  const now = new Date();
  let startDate;

  switch (period) {
    case 'weekly':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      break;
    case 'monthly':
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'yearly':
      startDate = new Date(now);
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      startDate = new Date(0); // All time
  }

  return { startDate, endDate: now };
};

// Weekly report
export const getWeeklyReport = async (req, res) => {
  try {
    const { startDate, endDate } = getDateRange('weekly');
    const transactions = await Transaction.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance,
        period: 'weekly',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Monthly report
export const getMonthlyReport = async (req, res) => {
  try {
    const { startDate, endDate } = getDateRange('monthly');
    const transactions = await Transaction.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance,
        period: 'monthly',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Yearly report
export const getYearlyReport = async (req, res) => {
  try {
    const { startDate, endDate } = getDateRange('yearly');
    const transactions = await Transaction.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance,
        period: 'yearly',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
