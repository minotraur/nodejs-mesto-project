import path from "path";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import cardsRoutes from "./routes/cards";
import { createUser, login } from "./controllers/users";
import { logError, logRequest } from "./middlewares/logHistory";
import auth from "./middlewares/auth";
import { errors } from "celebrate";
import { errorHandler } from "./middlewares/errorHandler";

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

// Логирование запросов
app.use(logRequest);

// Маршруты, не требующие авторизации
app.post("/signin", login);
app.post("/signup", createUser);


app.use("/users", usersRouter);
app.use("/cards", cardsRoutes);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next({ name: "NotFoundError", message: "Запрашиваемый ресурс не найден" });
});

// Логирование ошибок
app.use(logError);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(errorHandler);

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log("Ссылка на сервер");
  console.log(BASE_PATH);
});
