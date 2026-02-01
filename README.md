# Money Manager Backend

A RESTful API for managing personal and business finances built with Node.js, Express, and MongoDB.

## Features

- 📊 Transaction management (Income & Expenses)
- 🏦 Account management with transfers
- 📁 Category-wise tracking
- 🔄 Office/Personal division
- ⏰ 12-hour edit restriction
- 📈 Dashboard statistics (Month/Week/Year)
- 🔍 Advanced filtering options

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- Environment variables with dotenv

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or MongoDB Atlas account)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/money-manager?retryWrites=true&w=majority
```

For local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/money-manager
```

3. Seed the database with sample data:
```bash
npm run seed
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions (with optional filters)
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction (12-hour window)
- `DELETE /api/transactions/:id` - Delete transaction

**Query Parameters for GET /api/transactions:**
- `type` - Filter by income/expense
- `division` - Filter by office/personal
- `category` - Filter by category name
- `startDate` - Filter by start date
- `endDate` - Filter by end date
- `accountId` - Filter by account

### Dashboard
- `GET /api/dashboard/stats?period=month&date=2024-01-01` - Get statistics
  - period: 'week', 'month', or 'year'
- `GET /api/dashboard/history?page=1&limit=20` - Get paginated history

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/summary` - Get category spending summary
- `POST /api/categories` - Create new category

### Accounts
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/:id` - Get single account with recent transactions
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account
- `POST /api/accounts/transfer` - Transfer between accounts

### Health Check
- `GET /api/health` - Check API status

## Request Examples

### Create Transaction
```json
POST /api/transactions
{
  "type": "expense",
  "amount": 1500,
  "description": "Grocery shopping",
  "category": "Food",
  "division": "personal",
  "date": "2026-01-20T10:30:00Z",
  "accountId": "account_id_here"
}
```

### Transfer Between Accounts
```json
POST /api/accounts/transfer
{
  "fromAccountId": "source_account_id",
  "toAccountId": "destination_account_id",
  "amount": 5000,
  "description": "Monthly savings transfer"
}
```

## Database Models

### Transaction
- type: 'income' | 'expense'
- amount: Number
- description: String
- category: String
- division: 'office' | 'personal'
- date: Date
- accountId: ObjectId (reference to Account)
- timestamps: createdAt, updatedAt

### Account
- name: String
- balance: Number
- type: 'cash' | 'bank' | 'credit_card' | 'wallet'
- timestamps: createdAt, updatedAt

### Category
- name: String (unique)
- type: 'income' | 'expense'
- icon: String
- timestamps: createdAt, updatedAt

## Features

### 12-Hour Edit Restriction
Transactions can only be edited within 12 hours of creation. After this window, update requests will return a 403 error.

### Automatic Balance Updates
When transactions are created, updated, or deleted, associated account balances are automatically adjusted.

### Account Transfers
Money transfers between accounts create corresponding income and expense transactions for proper tracking.

## Development

The project includes sample data with:
- 15 predefined categories (Income & Expense)
- 3 sample accounts
- 18 sample transactions spanning different dates and categories

Run `npm run seed` to populate your database with this sample data.

## Deployment

This backend can be deployed to:
- Render
- Railway
- Heroku
- AWS/Azure/GCP

Make sure to set environment variables in your deployment platform.

## License

ISC
