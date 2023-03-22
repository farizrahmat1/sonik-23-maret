import express from "express";
import {
  getAllWarning,
  getWarning,
} from "../controller/WarningController.js";

const router = express.Router();

router.get("/", getAllWarning);
router.get("/:id", getWarning);
// router.post("/", addTransaction);
// router.post("/:id", updateTransaction);
// router.delete("/:id", deleteTransaction);

export default router;
