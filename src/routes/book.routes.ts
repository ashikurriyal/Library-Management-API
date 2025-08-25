import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from "../controllers/book.controller";

const router = Router();

router.post("/", createBook);          // POST /api/books
router.get("/", getAllBooks);          // GET  /api/books
router.get("/:bookId", getBookById);   // GET  /api/books/:bookId
router.put("/:bookId", updateBook);    // PUT  /api/books/:bookId
router.delete("/:bookId", deleteBook); // DELETE /api/books/:bookId

export default router;
