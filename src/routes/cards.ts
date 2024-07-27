import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
} from "../controllers/cards";

const router = Router();

const createCardValidation = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
};

const cardIdValidation = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

// Маршруты с валидацией
router.get("/", getCards);
router.post("/", celebrate(createCardValidation), createCard);
router.delete("/:cardId", celebrate(cardIdValidation), deleteCard);
router.put("/:cardId/likes", celebrate(cardIdValidation), likeCard);
router.delete("/:cardId/likes", celebrate(cardIdValidation), dislikeCard);

export default router;
