// // src/server.js
// import express from 'express';
// import mongoose from 'mongoose';

// const app = express();

// const uri = "mongodb+srv://money_user:sruthi12345@cluster0.mongodb.net/money_manager?retryWrites=true&w=majority";

// // Connect to MongoDB
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected successfully"))
// .catch((err) => console.error("MongoDB connection error:", err));

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Money Manager Backend Running!');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// MongoDB connection (STANDARD STRING – NO SRV)
const MONGO_URI =
  "mongodb://money_user:sruthi12345@cluster0-shard-00-00.968iz5r.mongodb.net:27017,cluster0-shard-00-01.968iz5r.mongodb.net:27017,cluster0-shard-00-02.968iz5r.mongodb.net:27017/money_manager?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Money Manager Backend Running!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

