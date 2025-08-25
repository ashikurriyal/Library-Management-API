import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../app";
import { connectDB } from "../config/db";

// Connect to MongoDB
connectDB(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};
