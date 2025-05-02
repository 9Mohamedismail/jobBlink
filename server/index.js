import express from "express";
import cors from "cors";
import helmet from "helmet";
import apiRoutes from "./routes/api.js";

const app = express();

// Environment configuration
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Security middleware
app.use(helmet());

// Enable CORS
app.use(cors({ origin: CLIENT_URL }));

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

// Start server
app
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Exiting...`);
      process.exit(1);
    } else {
      console.error("Server error:", err);
    }
  });
