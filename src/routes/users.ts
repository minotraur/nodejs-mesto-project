import { Router } from "express";
import {
  getCurrentUser,
  getUsers,
  getUsersById,
  updateAvatar,
  updateUser,
} from "../controllers/users";
import { auth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.get("/", validateRequest, getUsers);
router.get("/:userId", validateRequest, getUsersById);
router.get("/me", validateRequest, auth, getCurrentUser);
router.patch("/me", validateRequest, updateUser);
router.patch("/me/avatar", validateRequest, updateAvatar);

export default router;
