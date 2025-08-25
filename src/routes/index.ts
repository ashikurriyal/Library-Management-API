import { Router } from "express";
import bookRoutes from "./book.routes";
import borrowRoutes from "./borrow.routes";

const router = Router();

router.use("/books", bookRoutes);     // /api/books
router.use("/borrows", borrowRoutes); // /api/borrows

export default router;
