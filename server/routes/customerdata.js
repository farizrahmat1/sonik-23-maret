import express from "express";
import { getAllCustomer,getCustomer ,addCustomer, deleteCustomer, updateCustomer, addOcpp } from "../controller/CustomerDataController.js";


const router = express.Router();

router.get("/", getAllCustomer);
router.get("/:id", getCustomer);
router.post("/", addCustomer);
router.post("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
