import express from "express";
import cors from "cors";
import helmet from "helmet";
import apiRoutes from "./routes/api.js";
import { getBrowser } from "./utils/browser.js";

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(helmet());

app.use(cors({ origin: CLIENT_URL }));

app.use(express.json());

app.use("/api", apiRoutes);

process.on("SIGTERM", async () => {
  console.log("SIGTERM received: shutting down...");
  try {
    const browser = await getBrowser();
    if (browser) await browser.close();
  } catch (e) {
    console.error("Error closing browser:", e.message);
  } finally {
    process.exit(0);
  }
});

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
