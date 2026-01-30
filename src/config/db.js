// // db.js
// const mongoose = require("mongoose");

// const uri =
//   "mongodb+srv://money_user:sruthi12345@cluster0.968iz5r.mongodb.net/money_manager";

// mongoose
//   .connect(uri)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// module.exports = mongoose;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
