import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/exeptions/ApiError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);

  // Body parser invalid JSON
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Некорректный JSON в запросе" });
  }

  // Our domain errors (thrown from services/controllers)
  if (err instanceof ApiError) {
    return res.status(err.status ?? 500).json({
      message: err.message,
      errors: err.errors,
    });
  }

  // Mongoose validation errors
  if (err?.name === "ValidationError") {
    return res
      .status(400)
      .json({ message: "Ошибка валидации БД", errors: err.errors });
  }

  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
