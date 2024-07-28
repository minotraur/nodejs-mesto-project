import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    status: statusCode,
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
};
