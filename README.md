
## Money Manager Backend

Backend API for the **Money Manager** application built with **Node.js**, **Express**, and **MongoDB Atlas**.  
This API handles transactions, transfers, reports, and summaries for personal and office finance management.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- Add, edit (within 12 hours), and delete transactions
- Filter transactions by category, division, date range, and type
- Generate weekly, monthly, and yearly reports
- Summary of transactions by category and division
- Transfer funds between accounts
- Secure and modular backend API for integration with frontend

---

## Tech Stack
- **Node.js** – JavaScript runtime
- **Express** – Web framework
- **MongoDB Atlas** – Cloud NoSQL database
- **Mongoose** – ODM for MongoDB
- **dotenv** – Environment variables management
- **Cors** – Enable cross-origin requests

---

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Sruthi141/money-manager-backend.git
cd money-manager-backend
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
NODE_ENV=development
```

---

## Running the Server

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

Server will run at `http://localhost:5000` by default.

---

## API Endpoints

### **Transactions**

| Method | Endpoint                       | Description                        |
| ------ | ------------------------------ | ---------------------------------- |
| POST   | `/api/transactions/add`        | Add a new transaction              |
| GET    | `/api/transactions`            | Get all transactions               |
| GET    | `/api/transactions/filter`     | Filter transactions                |
| GET    | `/api/transactions/:id`        | Get transaction by ID              |
| PUT    | `/api/transactions/edit/:id`   | Edit transaction (within 12 hours) |
| DELETE | `/api/transactions/delete/:id` | Delete transaction                 |

### **Reports**

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| GET    | `/api/reports/weekly`  | Get weekly report  |
| GET    | `/api/reports/monthly` | Get monthly report |
| GET    | `/api/reports/yearly`  | Get yearly report  |

### **Summary**

| Method | Endpoint                  | Description               |
| ------ | ------------------------- | ------------------------- |
| GET    | `/api/summary/categories` | Get summary of categories |
| GET    | `/api/summary/divisions`  | Get summary of divisions  |

### **Transfers**

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/transfers/add` | Add a transfer    |
| GET    | `/api/transfers`     | Get all transfers |

---

## Deployment

* Deploy to **Render** (or any Node.js hosting service):

  * **Build Command:** (none)
  * **Start Command:** `npm start`
  * **Environment Variables:** `MONGODB_URI`, `PORT`

* Alternatively, can be deployed on **Heroku**, **AWS**, **Railway**, or **Docker container**.

---

## Contributing

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash
git commit -m "feat: describe your feature"
```

4. Push to your branch:

```bash
git push origin feature/your-feature-name
```

5. Create a Pull Request

---

## License

This project is **open-source** and free to use for educational purposes.


