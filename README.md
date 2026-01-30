# Money Manager Backend

Backend API for Money Manager application built with Node.js, Express, and MongoDB Atlas.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
NODE_ENV=development
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

### Transactions
- `POST /api/transactions/add` - Add a new transaction
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/filter` - Filter transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `PUT /api/transactions/edit/:id` - Edit transaction (within 12 hours)
- `DELETE /api/transactions/delete/:id` - Delete transaction

### Reports
- `GET /api/reports/weekly` - Get weekly report
- `GET /api/reports/monthly` - Get monthly report
- `GET /api/reports/yearly` - Get yearly report

### Summary
- `GET /api/summary/categories` - Get category summary
- `GET /api/summary/divisions` - Get division summary

### Transfers
- `POST /api/transfers/add` - Add a transfer
- `GET /api/transfers` - Get all transfers

## Deployment

Deploy to Render with:
- Build Command: (none)
- Start Command: `npm start`
- Environment Variables: Add MONGODB_URI and PORT
