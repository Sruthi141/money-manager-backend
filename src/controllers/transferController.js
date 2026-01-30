import Transfer from '../models/Transfer.js';

// Add transfer
export const addTransfer = async (req, res) => {
  try {
    const { fromAccount, toAccount, amount } = req.body;

    if (fromAccount === toAccount) {
      return res.status(400).json({
        success: false,
        error: 'From and To accounts cannot be the same',
      });
    }

    const transfer = new Transfer(req.body);
    await transfer.save();
    res.status(201).json({ success: true, data: transfer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all transfers
export const getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: transfers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
