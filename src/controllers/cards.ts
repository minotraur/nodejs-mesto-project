import { NextFunction, Request, Response } from "express";
import Card from "../models/card";

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find().populate("owner");
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const createCard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, link } = req.body;
    const owner = req.userId;

    const newCard = new Card({ name, link, owner });
    await newCard.save();

    res.status(201).json(newCard);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return next({
        name: "ValidationError",
        message: "Переданы некорректные данные при создании карточки",
      });
    }
    next(err);
  }
};

interface AuthRequest extends Request {
  userId?: string;
}

export const deleteCard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      return next({
        name: "DocumentNotFoundError",
        message: "Карточка не найдена",
      });
    }

    if (card.owner.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Нет прав на удаление данной карточки" });
    }

    await card.deleteOne();

    res.status(200).json({ message: "Карточка удалена" });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Некорректный _id карточки" });
    }
    next(err);
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: "6693b4dd60c5309330a32aa2" } },
      { new: true }
    );

    if (!card) {
      return next({
        name: "DocumentNotFoundError",
        message: "Карточка не найдена",
      });
    }

    res.status(200).json(card);
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Некорректный _id карточки" });
    }
    next(err);
  }
};

export const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: "6693b4dd60c5309330a32aa2" } },
      { new: true }
    );

    if (!card) {
      return next({
        name: "DocumentNotFoundError",
        message: "Карточка не найдена",
      });
    }

    res.status(200).json(card);
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Некорректный _id карточки" });
    }
    next(err);
  }
};
