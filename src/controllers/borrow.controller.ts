import { Request, Response, NextFunction } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";
import { sendSuccess } from "../utils/sendResponse";

// 6) Borrow a Book (business logic + static method)
export async function borrowBook(req: Request, res: Response, next: NextFunction) {
  try {
    const { book, quantity, dueDate } = req.body || {};
    // adjust inventory via Book static method (enforces rules)
    await Book.borrowBook(book, quantity);

    const borrowRecord = await Borrow.create({ book, quantity, dueDate });
    return sendSuccess(res, "Book borrowed successfully", borrowRecord, 201);
  } catch (err) { next(err); }
}

// 7) Borrowed Books Summary (Aggregation)
export async function getBorrowSummary(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await Borrow.aggregate([
      { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book"
        }
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          book: { title: "$book.title", isbn: "$book.isbn" },
          totalQuantity: 1
        }
      }
    ]);
    return sendSuccess(res, "Borrowed books summary retrieved successfully", result);
  } catch (err) { next(err); }
}
