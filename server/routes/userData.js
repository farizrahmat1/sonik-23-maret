import express from "express";
import {
  getAllUser,
  getUser,
  deleteUser,
} from "../controller/UserController.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;
