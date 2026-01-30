import Transaction from '../models/Transaction.js';

// Get category summary
export const getCategorySummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ type: 'expense' });
    const categoryMap = {};

    transactions.forEach((transaction) => {
      if (categoryMap[transaction.category]) {
        categoryMap[transaction.category] += transaction.amount;
      } else {
        categoryMap[transaction.category] = transaction.amount;
      }
    });

    const categorySummary = Object.entries(categoryMap).map(([category, total]) => ({
      category,
      total,
    }));

    res.status(200).json({ success: true, data: categorySummary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get division summary
export const getDivisionSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ type: 'expense' });
    const divisionMap = { Office: 0, Personal: 0 };

    transactions.forEach((transaction) => {
      divisionMap[transaction.division] += transaction.amount;
    });

    const divisionSummary = Object.entries(divisionMap).map(([division, total]) => ({
      division,
      total,
    }));

    res.status(200).json({ success: true, data: divisionSummary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
