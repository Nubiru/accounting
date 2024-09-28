import express from "express";
import {
  getAllUsers,
  getUser,
  removeUser,
} from "../controllers/usersController.js";
import { roleVerification } from "../middleware/roleVerification.js";

const router = express.Router();

router.delete("/:id", roleVerification, removeUser);
router.get("/", roleVerification, getAllUsers);
router.get("/:id", getUser);

export default router;
