import { Schema, model, Document } from "mongoose";

export interface IBorrow extends Document {
  book: Schema.Types.ObjectId; // ref Book
  quantity: number;            // positive int
  dueDate: Date;
}

const BorrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book is required"]
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: { validator: Number.isInteger, message: "Quantity must be an integer" }
    },
    dueDate: { type: Date, required: [true, "dueDate is required"] }
  },
  { timestamps: true }
);

// Example post middleware (auditing / side effects)
BorrowSchema.post("save", function (doc) {
  // You could log or emit events; kept simple for assignment
  // console.log(`Borrow record created: ${doc._id}`);
});

export const Borrow = model<IBorrow>("Borrow", BorrowSchema);
