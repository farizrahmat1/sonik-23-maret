import express from "express";
import { getAllCustomerTransaction } from "../controller/TransactionCustomerController.js";

const router = express.Router();

router.get("/", getAllCustomerTransaction);

export default router;
