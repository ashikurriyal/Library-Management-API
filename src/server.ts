import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5001;
const DB_URL = process.env.MONGO_URI as string; // <- fixed

async function bootstrap() {
  await connectDB(DB_URL);
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

bootstrap().catch(err => {
  console.error("❌ Failed to start:", err);
  process.exit(1);
});
