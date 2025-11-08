import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "The application is running successfully with the mounted volume." });
});

// New endpoint to check server status
app.get("/status", (req, res) => {
  res.json({ status: "Server is up and running", time: new Date() });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});