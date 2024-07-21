import { Request, Response, NextFunction } from "express";
import { requestSchema } from "../validation";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = requestSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
