import { Request, Response, NextFunction } from "express";
import { Book } from "../models/book.model";
import { sendSuccess } from "../utils/sendResponse";

export async function createBook(req: Request, res: Response, next: NextFunction) {
  try {
    const book = await Book.create(req.body);
    return sendSuccess(res, "Book created successfully", book, 201);
  } catch (err) { next(err); }
}

export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
  try {
    const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query as Record<string,string>;

    const findQuery: any = {};
    if (filter) findQuery.genre = filter;

    const sortDir = sort?.toLowerCase() === "desc" ? -1 : 1;
    const allowedSort = ["createdAt", "updatedAt", "title", "author", "copies"];
    const sortField = allowedSort.includes(sortBy) ? sortBy : "createdAt";

    const books = await Book.find(findQuery)
      .sort({ [sortField]: sortDir })
      .limit(parseInt(limit || "10", 10));

    return sendSuccess(res, "Books retrieved successfully", books);
  } catch (err) { next(err); }
}

export async function getBookById(req: Request, res: Response, next: NextFunction) {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      const e: any = new Error("Book not found");
      e.statusCode = 404;
      throw e;
    }
    return sendSuccess(res, "Book retrieved successfully", book);
  } catch (err) { next(err); }
}

export async function updateBook(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      const e: any = new Error("Book not found");
      e.statusCode = 404;
      throw e;
    }
    return sendSuccess(res, "Book updated successfully", updated);
  } catch (err) { next(err); }
}

export async function deleteBook(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.bookId);
    if (!deleted) {
      const e: any = new Error("Book not found");
      e.statusCode = 404;
      throw e;
    }
    // EXACT response requires data: null
    return sendSuccess(res, "Book deleted successfully", null);
  } catch (err) { next(err); }
}
