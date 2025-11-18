import express from "express";
import dotenv from "dotenv";
import os from "os";
import apiRoutes from "./routes/api.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "The application is running successfully with the mounted volume." });
});

// API routes
app.use("/api", apiRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});