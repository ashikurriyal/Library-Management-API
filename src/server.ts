import mongoose from "mongoose";
import { config } from "./config";
import app from "./app";

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.dbUrl);
    console.log("✅ Connected to MongoDB");

    // Start server
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1); // Exit if DB connection fails
  }
}

startServer();
