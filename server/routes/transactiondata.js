import express from "express";
import {
  getAllTransactionsStart,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  // getAllTransactionStop,
} from "../controller/TransactionDataController.js";

const router = express.Router();

router.get("/", getAllTransactionsStart);
// router.get("/:id", getAllTransactionStop);
router.post("/", addTransaction);
router.post("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
