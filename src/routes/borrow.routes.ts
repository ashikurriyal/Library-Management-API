import { Router } from "express";
import { borrowBook, getBorrowSummary } from "../controllers/borrow.controller";

const router = Router();

router.post("/borrow", borrowBook); // POST /api/borrow
router.get("/borrow", getBorrowSummary); // GET /api/borrow

export default router;
