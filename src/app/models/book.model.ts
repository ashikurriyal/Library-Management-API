import { model, Schema, Types } from "mongoose";
import { IBook, BookModel, BookInstanceMethods } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, BookModel, BookInstanceMethods>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
      required: true,
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});


bookSchema.pre("findOneAndUpdate", function (next) {
  const update: any = this.getUpdate() || {};
  const $set = update.$set || update;

  if (typeof $set.copies === "number") {
    $set.available = $set.copies > 0;
    if (update.$set) update.$set = $set;
    else Object.assign(update, $set);
    this.setUpdate(update);
  }
  next();
});


bookSchema.methods.hasEnoughCopies = function (quantity: number) {
  return this.copies >= quantity;
};


bookSchema.statics.updateAvailability = async function (bookId: Types.ObjectId) {
  const book = await this.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  } else {
    console.warn(`Book with ID ${bookId} not found for availability update.`);
  }
};


bookSchema.statics.borrowBook = async function (bookId: Types.ObjectId | string, quantity: number) {
  const book = await this.findById(bookId);
  if (!book) {
    const e: any = new Error("Book not found");
    e.statusCode = 404;
    throw e;
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    const e: any = new Error("Quantity must be a positive integer");
    e.statusCode = 400;
    throw e;
  }
  if (!book.hasEnoughCopies(quantity)) {
    const e: any = new Error("Not enough copies available");
    e.statusCode = 400;
    throw e;
  }

  book.copies = book.copies - quantity;
  book.available = book.copies > 0;
  await book.save();

  return book;
};

export const Book = model<IBook, BookModel>("Book", bookSchema);
