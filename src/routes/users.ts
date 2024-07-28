import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import {
  getCurrentUser,
  getUsers,
  getUsersById,
  updateAvatar,
  updateUser,
} from "../controllers/users";
import { auth } from "../middlewares/auth";

const router = Router();

const userIdValidation = {
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};

const updateUserValidation = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
};

const updateAvatarValidation = {
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
};

router.use(auth);

// Маршруты с валидацией
router.get("/", getUsers);
router.get("/:userId", celebrate(userIdValidation), getUsersById);
router.get("/me", getCurrentUser);
router.patch("/me", celebrate(updateUserValidation), updateUser);
router.patch("/me/avatar", celebrate(updateAvatarValidation), updateAvatar);

export default router;
