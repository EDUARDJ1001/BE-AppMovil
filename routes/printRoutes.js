import express from "express";
import { printTicket } from "../controllers/printController.js";

const router = express.Router();

router.post("/print", printTicket);

export default router;