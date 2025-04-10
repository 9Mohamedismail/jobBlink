import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";

const app = express();

app.use(cors());

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${PORT} is already in use. Exiting...`);
      process.exit(1);
    } else {
      console.error("Server error:", err);
    }
  });
