import express from "express";
import cors from "cors";
import routes from "./routes";
import { globalError } from "./middlewares/globalError";
import { notFound } from "./middlewares/notFound";

const app = express();

app.use(express.json());

app.use("/api", routes);

// 👇 root route
app.get("/", (req, res) => {
  res.send("📚 Welcome to the Book Borrowing API!");
});

// 404 for unknown routes
app.use(notFound);

// Global error handler
app.use(globalError);

export default app;
