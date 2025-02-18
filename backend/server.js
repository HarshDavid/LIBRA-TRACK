import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";

/* App Config */
dotenv.config(); // Load environment variables

const app = express(); // Initialize Express
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("Error: MONGO_URL is not defined in environment variables.");
  process.exit(1); // Stop execution if MONGO_URL is missing
}

/* Database Connection */
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

/* Default Route */
app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

/* Start Server */
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
  