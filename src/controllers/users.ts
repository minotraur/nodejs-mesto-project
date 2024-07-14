import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name == "DocumentNotFoundError") {
        res.status(404).send({ message: "Пользователи не найдены." });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

export const getUsersById = (req: Request, res: Response) => {
  return User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() =>
      res.status(404).json({ message: "Запрашиваемый пользователь не найден" })
    );
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar } = req.body;

    const newUser = new User({ name, about, avatar });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Переданы некорректные данные при создании карточки",
      });
    }
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Обновление профиля пользователя
export const updateUser = async (req: Request, res: Response) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    "6693b4dd60c5309330a32aa2",
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(404).json({ message: "Запрашиваемый пользователь не найден" })
    );
};

// Обновление аватара пользователя
export const updateAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    "6693b4dd60c5309330a32aa2",
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch(() =>
      res.status(404).json({ message: "Запрашиваемый пользователь не найден" })
    );
};
