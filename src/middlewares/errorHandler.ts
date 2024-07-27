import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
  message?: string | null
) => {
  if (err.code === 11000) {
    return res.status(409).json({ message: message ?? "Email уже существует" });
  }

  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ message: message ?? "Переданы некорректные данные" });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: message ?? "Некорректный токен" });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(404).json({ message: message ?? "Не найдено ;(" });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(404).json({ message: message ?? "Не найдено ;(" });
  }

  if (err.name === "InternalServerError") {
    return res.status(500).json({ message: message ?? "Ошибка сервера" });
  }
};
