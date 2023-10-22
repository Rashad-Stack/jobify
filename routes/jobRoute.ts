import express from "express";
import { authenticatedUser } from "../controllers/authController";
import {
  createJob,
  deleteJob,
  getAllJobs,
  showStats,
  updateJob,
} from "../controllers/jobController";

const router = express.Router();

// Protected by user authentication
router.use(authenticatedUser);

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").patch(updateJob).delete(deleteJob);
router.get("/stats", showStats);

export default router;
