import mongoose from "mongoose";

export async function connectDB(MONGO_URI: any) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");
}
