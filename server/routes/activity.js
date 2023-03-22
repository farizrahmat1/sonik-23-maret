import express from "express";
import {
    getActivity,
    getAllActivity,
} from "../controller/ActivityController.js";

const router = express.Router();

router.get("/", getAllActivity);
router.get("/:id", getActivity);
// router.post("/", addTransaction);
// router.post("/:id", updateTransaction);
// router.delete("/:id", deleteTransaction);

export default router;
