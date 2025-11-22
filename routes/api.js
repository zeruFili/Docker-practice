import express from "express";
import os from "os";

const router = express.Router();

// Root endpoint
router.get("/", (req, res) => {
  res.json({ message: "The application is running successfully with the mounted volume." });
});

// Server status endpoint
router.get("/status", (req, res) => {
  res.json({ status: "Server is up and running", time: new Date() });
});

// Detailed health check endpoint with system information
router.get("/health", (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  const cpuCount = os.cpus().length;
  
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(uptime),
      formatted: `${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`
    },
    memory: {
      used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`
    },
    system: {
      platform: os.platform(),
      arch: os.arch(),
      cpuCount: cpuCount,
      hostname: os.hostname()
    },
    nodeVersion: process.version
  });
});

export default router;




