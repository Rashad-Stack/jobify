import express from "express";
import {
  authenticatedUser,
  getCurrentUser,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/update-user", authenticatedUser, updateUser);
router.get("/currentUser", authenticatedUser, getCurrentUser);

export default router;
