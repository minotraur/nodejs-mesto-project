import path from "path";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import cardsRoutes from "./routes/cards";

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

// Подключение роутов
app.use("/users", usersRouter);
app.use("/users/:userId", usersRouter);
app.use("/users/me", usersRouter);
app.use("/users/me/avatar", usersRouter);

app.use("/cards", cardsRoutes);
app.use("/cards/:cardId", cardsRoutes);
app.use("/cards/:cardId/likes", cardsRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log("Ссылка на сервер");
  console.log(BASE_PATH);
});
