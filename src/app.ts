import express from "express";
import cors from "cors";
import routes from "./routes";
import { globalError } from "./middlewares/globalError";
import { notFound } from "./middlewares/notFound";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => res.send("📚 Welcome to the Book Borrowing API!"));

app.use(notFound);
app.use(globalError);

export default app;
