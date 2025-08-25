import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// REQUIRED: exact generic error response shape
export function globalError(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Mongoose ValidationError
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: err
    });
  }

  // CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Invalid id",
      success: false,
      error: err
    });
  }

  // Duplicate key (e.g., unique isbn)
  if (err?.code === 11000) {
    return res.status(409).json({
      message: "Duplicate key",
      success: false,
      error: err
    });
  }

  const status = err?.statusCode || 500;
  return res.status(status).json({
    message: err?.message || "Something went wrong",
    success: false,
    error: err
  });
}
