import { Router } from "express";
import {
  createUser,
  getUsers,
  getUsersById,
  updateAvatar,
  updateUser,
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/", getUsersById);
router.post("/", createUser);
router.patch("/", updateUser);
router.patch("/", updateAvatar);

export default router;
