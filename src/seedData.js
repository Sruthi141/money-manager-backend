require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Account = require('./models/Account');
const Transaction = require('./models/Transaction');

const categories = [
  // Income categories
  { name: 'Salary', type: 'income', icon: 'wallet' },
  { name: 'Business', type: 'income', icon: 'briefcase' },
  { name: 'Investment', type: 'income', icon: 'trending-up' },
  { name: 'Other Income', type: 'income', icon: 'plus-circle' },
  
  // Expense categories
  { name: 'Fuel', type: 'expense', icon: 'fuel' },
  { name: 'Food', type: 'expense', icon: 'utensils' },
  { name: 'Movie', type: 'expense', icon: 'film' },
  { name: 'Medical', type: 'expense', icon: 'heart' },
  { name: 'Loan', type: 'expense', icon: 'credit-card' },
  { name: 'Shopping', type: 'expense', icon: 'shopping-bag' },
  { name: 'Utilities', type: 'expense', icon: 'zap' },
  { name: 'Rent', type: 'expense', icon: 'home' },
  { name: 'Transport', type: 'expense', icon: 'car' },
  { name: 'Transfer', type: 'expense', icon: 'arrow-right' },
  { name: 'Other Expense', type: 'expense', icon: 'more-horizontal' }
];

const accounts = [
  { name: 'Main Bank Account', balance: 50000, type: 'bank' },
  { name: 'Cash Wallet', balance: 5000, type: 'cash' },
  { name: 'Credit Card', balance: 0, type: 'credit_card' }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Category.deleteMany({});
    await Account.deleteMany({});
    await Transaction.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`Inserted ${insertedCategories.length} categories`);
    
    // Insert accounts
    const insertedAccounts = await Account.insertMany(accounts);
    console.log(`Inserted ${insertedAccounts.length} accounts`);
    
    const mainAccount = insertedAccounts[0];
    const cashAccount = insertedAccounts[1];
    
    // Create sample transactions
    const transactions = [
      // Income transactions
      {
        type: 'income',
        amount: 75000,
        description: 'Monthly Salary - January',
        category: 'Salary',
        division: 'office',
        date: new Date('2026-01-01'),
        accountId: mainAccount._id
      },
      {
        type: 'income',
        amount: 15000,
        description: 'Freelance Project Payment',
        category: 'Business',
        division: 'personal',
        date: new Date('2026-01-05'),
        accountId: mainAccount._id
      },
      {
        type: 'income',
        amount: 3000,
        description: 'Stock Dividend',
        category: 'Investment',
        division: 'personal',
        date: new Date('2026-01-10'),
        accountId: mainAccount._id
      },
      
      // Expense transactions - Office
      {
        type: 'expense',
        amount: 2500,
        description: 'Petrol for official travel',
        category: 'Fuel',
        division: 'office',
        date: new Date('2026-01-03'),
        accountId: mainAccount._id
      },
      {
        type: 'expense',
        amount: 1800,
        description: 'Team lunch meeting',
        category: 'Food',
        division: 'office',
        date: new Date('2026-01-07'),
        accountId: mainAccount._id
      },
      {
        type: 'expense',
        amount: 500,
        description: 'Office supplies',
        category: 'Shopping',
        division: 'office',
        date: new Date('2026-01-12'),
        accountId: mainAccount._id
      },
      
      // Expense transactions - Personal
      {
        type: 'expense',
        amount: 25000,
        description: 'Monthly rent payment',
        category: 'Rent',
        division: 'personal',
        date: new Date('2026-01-02'),
        accountId: mainAccount._id
      },
      {
        type: 'expense',
        amount: 3500,
        description: 'Electricity and water bill',
        category: 'Utilities',
        division: 'personal',
        date: new Date('2026-01-04'),
        accountId: mainAccount._id
      },
      {
        type: 'expense',
        amount: 1200,
        description: 'Grocery shopping',
        category: 'Food',
        division: 'personal',
        date: new Date('2026-01-06'),
        accountId: cashAccount._id
      },
      {
        type: 'expense',
        amount: 800,
        description: 'Movie tickets and snacks',
        category: 'Movie',
        division: 'personal',
        date: new Date('2026-01-08'),
        accountId: cashAccount._id
      },
      {
        type: 'expense',
        amount: 1500,
        description: 'Petrol for personal vehicle',
        category: 'Fuel',
        division: 'personal',
        date: new Date('2026-01-09'),
        accountId: mainAccount._id
      },
      {
        type: 'expense',
        amount: 2500,
        description: 'Doctor consultation and medicines',
        category: 'Medical',
        division: 'personal',
        date: new Date('2026-01-11'),
        accountId: mainAccount._id
      },
      {
        type: 'expense',
        amount: 5000,
        description: 'Personal loan EMI',
        category: 'Loan',
        division: 'personal',
        date: new Date('2026-01-13'),
        accountId: mainAccount._id
      },
      {
        type: 'expense',
        amount: 4500,
        description: 'New clothes shopping',
        category: 'Shopping',
        division: 'personal',
        date: new Date('2026-01-15'),
        accountId: mainAccount._id
      },
      {
        type: 'expense',
        amount: 600,
        description: 'Auto rickshaw fare',
        category: 'Transport',
        division: 'personal',
        date: new Date('2026-01-16'),
        accountId: cashAccount._id
      },
      {
        type: 'expense',
        amount: 2200,
        description: 'Restaurant dinner',
        category: 'Food',
        division: 'personal',
        date: new Date('2026-01-18'),
        accountId: mainAccount._id
      },
      
      // Recent transactions (within 12 hours for testing edit feature)
      {
        type: 'expense',
        amount: 150,
        description: 'Coffee at cafe',
        category: 'Food',
        division: 'personal',
        date: new Date(),
        accountId: cashAccount._id
      },
      {
        type: 'income',
        amount: 2000,
        description: 'Bonus payment',
        category: 'Other Income',
        division: 'office',
        date: new Date(),
        accountId: mainAccount._id
      }
    ];
    
    const insertedTransactions = await Transaction.insertMany(transactions);
    console.log(`Inserted ${insertedTransactions.length} transactions`);
    
    // Update account balances based on transactions
    let mainBalance = 50000;
    let cashBalance = 5000;
    
    transactions.forEach(t => {
      if (t.accountId.equals(mainAccount._id)) {
        mainBalance += t.type === 'income' ? t.amount : -t.amount;
      } else if (t.accountId.equals(cashAccount._id)) {
        cashBalance += t.type === 'income' ? t.amount : -t.amount;
      }
    });
    
    await Account.findByIdAndUpdate(mainAccount._id, { balance: mainBalance });
    await Account.findByIdAndUpdate(cashAccount._id, { balance: cashBalance });
    
    console.log('Updated account balances');
    console.log('\nSeed data inserted successfully!');
    console.log(`\nAccount Balances:`);
    console.log(`- Main Bank Account: ₹${mainBalance}`);
    console.log(`- Cash Wallet: ₹${cashBalance}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
