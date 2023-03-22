import express from "express";
import { getConnectorStatus } from "../controller/ConnectorStatusController.js";

const router = express.Router();

router.get("/:id", getConnectorStatus);

export default router;
