import express from "express";
import { login, register, logout, registerAdmin } from "../controller/Auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/registerAdmin", registerAdmin);

export default router;
