import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const getUsersById = (req: Request, res: Response) => {
  return User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() =>
      res.status(404).json({ message: "Запрашиваемый пользователь не найден" })
    );
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
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
