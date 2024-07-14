import { Router } from "express";
import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
} from "../controllers/cards";

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.delete("/", deleteCard);
router.put("/", likeCard);
router.delete("/", dislikeCard);

export default router;
