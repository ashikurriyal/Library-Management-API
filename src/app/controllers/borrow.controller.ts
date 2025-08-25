import express, { Request, Response, NextFunction } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router();

// 6) Borrow a Book (business logic via Book.borrowBook)
borrowRoutes.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book, quantity, dueDate } = req.body;

    
    await Book.borrowBook(book, quantity);

    // Create borrow record
    const data = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 7) Borrowed Books Summary (Aggregation)
borrowRoutes.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});
