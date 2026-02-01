const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Get category summary with spending
exports.getCategorySummary = async (req, res) => {
  try {
    const categories = await Category.find();
    
    const summary = await Promise.all(
      categories.map(async (category) => {
        const transactions = await Transaction.find({ category: category.name });
        
        const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
        const transactionCount = transactions.length;
        
        return {
          _id: category._id,
          name: category.name,
          type: category.type,
          icon: category.icon,
          totalAmount,
          transactionCount
        };
      })
    );
    
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category summary', error: error.message });
  }
};

// Create category
exports.createCategory = async (req, res) => {
  try {
    const { name, type, icon } = req.body;
    
    const category = new Category({ name, type, icon });
    await category.save();
    
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
};
