import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import { errorHandler } from "./app/moddlewares/erroHandler";
import { notFound } from "./app/moddlewares/notFound";

const app: Application = express();
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});


app.use(notFound);
app.use(errorHandler);
export default app;