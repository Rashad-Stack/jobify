import express from "express";
import {
  authenticatedUser,
  login,
  register,
  updateUser,
} from "../controllers/authController";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.patch("/update-user", authenticatedUser, updateUser);

export default router;
