import { Schema, model, Document, Model } from "mongoose";

export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;       // non-negative integer
  available: boolean;   // default true
  // Instance helper
  hasEnoughCopies(qty: number): boolean;
}

export interface BookModel extends Model<IBook> {
  // Static for business logic during borrow
  borrowBook(bookId: string, quantity: number): Promise<IBook>;
}

const BookSchema = new Schema<IBook, BookModel>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: { type: String, required: [true, "Author is required"], trim: true },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: ["FICTION","NON_FICTION","SCIENCE","HISTORY","BIOGRAPHY","FANTASY"]
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true
    },
    description: { type: String, default: "" },
    copies: {
      type: Number,
      required: [true, "Copies is required"],
      min: [0, "Copies must be a positive number"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer"
      }
    },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Keep availability in sync when saving
BookSchema.pre("save", function (next) {
  if (this.copies <= 0) this.available = false;
  else this.available = true;
  next();
});

// Keep availability in sync when updating via findOneAndUpdate
BookSchema.pre("findOneAndUpdate", function (next) {
  const update: any = this.getUpdate() || {};
  // Normalize $set usage
  const $set = update.$set || update;

  if (typeof $set.copies === "number") {
    $set.available = $set.copies > 0;
    // write back
    if (update.$set) update.$set = $set;
    else Object.assign(update, $set);
    this.setUpdate(update);
  }
  next();
});

// Instance method
BookSchema.methods.hasEnoughCopies = function (qty: number) {
  return this.copies >= qty;
};

// Static method to enforce borrow rules
BookSchema.statics.borrowBook = async function (bookId: string, quantity: number) {
  const book = await this.findById(bookId);
  if (!book) {
    const err: any = new Error("Book not found");
    err.statusCode = 404;
    throw err;
  }
  if (quantity <= 0 || !Number.isInteger(quantity)) {
    const err: any = new Error("Quantity must be a positive integer");
    err.statusCode = 400;
    throw err;
  }
  if (!book.hasEnoughCopies(quantity)) {
    const err: any = new Error("Not enough copies available");
    err.statusCode = 400;
    throw err;
  }
  book.copies = book.copies - quantity;
  if (book.copies === 0) book.available = false; // business rule
  await book.save();
  return book;
};

export const Book = model<IBook, BookModel>("Book", BookSchema);
