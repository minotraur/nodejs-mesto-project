import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.code === 11000) {
    return res.status(409).json({ message: "Email уже существует" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Переданы некорректные данные" });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Некорректный токен" });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(404).json({ message: "Не найдено ;(" });
  }

  res.status(500).json({ message: "Ошибка сервера" });
};
