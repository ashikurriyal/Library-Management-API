import express, { Request, Response, NextFunction } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

// 1) Create Book
bookRoutes.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Book.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 2) Get All Books (filtering, sorting, limit)
bookRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query as Record<string, string>;

    const query: any = {};
    if (filter) query.genre = filter;

    const allowedSort = ["createdAt", "updatedAt", "title", "author", "copies"];
    const sortField = allowedSort.includes(sortBy) ? sortBy : "createdAt";
    const sortDir = sort.toLowerCase() === "desc" ? -1 : 1;

    const resultLimit = parseInt(limit, 10) || 10;

    const data = await Book.find(query).sort({ [sortField]: sortDir }).limit(resultLimit);

    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 3) Get Book by ID
bookRoutes.get("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const data = await Book.findById(bookId);
    if (!data) {
      const e: any = new Error("Book not found");
      e.statusCode = 404;
      throw e;
    }
    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 4) Update Book
bookRoutes.put("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;

    const data = await Book.findOneAndUpdate(
      { _id: bookId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!data) {
      const e: any = new Error("Book not found");
      e.statusCode = 404;
      throw e;
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 5) Delete Book
bookRoutes.delete("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const deleted = await Book.findByIdAndDelete(bookId);
    if (!deleted) {
      const e: any = new Error("Book not found");
      e.statusCode = 404;
      throw e;
    }
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});
