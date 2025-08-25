import { Model, Types } from "mongoose";

export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}


export interface BookInstanceMethods {
  hasEnoughCopies(quantity: number): boolean;
}


export interface BookModel extends Model<IBook, {}, BookInstanceMethods> {
  borrowBook(bookId: Types.ObjectId | string, quantity: number): Promise<any>;
  updateAvailability(bookId: Types.ObjectId): Promise<void>;
}
