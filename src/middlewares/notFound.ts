import { Request, Response } from "express";

export const notFound = (_req: Request, res: Response) => {
  return res.status(404).json({
    message: "Route not found",
    success: false,
    error: { status: 404 },
  });
};
