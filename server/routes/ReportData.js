import express from "express";
import { getAllReport } from "../controller/ReportController.js";

const router = express.Router();

router.get("/", getAllReport);

export default router;
