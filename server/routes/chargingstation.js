import express from "express";
import {
  getAllCS,
  getCS,
  addCS,
  deleteCS,
  updateCS,
  getAllConnector,
  addConnectorStatus,
} from "../controller/ChargingStationController.js";

const router = express.Router();

router.get("/", getAllCS);
router.get("/connectorCS", getAllConnector);
router.get("/:id", getCS);
router.post("/", addCS);
router.post("/connectorStatus", addConnectorStatus);
router.post("/:id", updateCS);
router.delete("/:id", deleteCS);

export default router;
