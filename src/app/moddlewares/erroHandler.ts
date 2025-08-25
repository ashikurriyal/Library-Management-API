import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: err,
    });
  }

  
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Invalid id",
      success: false,
      error: err,
    });
  }

  
  if (err?.code === 11000) {
    return res.status(409).json({
      message: "Duplicate key",
      success: false,
      error: err,
    });
  }

  
  const status = err?.statusCode || 400;
  return res.status(status).json({
    message: err?.message || "Validation failed",
    success: false,
    error: err,
  });
};
