import express from "express";
import { createWidget, getWidgets, deleteWidget } from "../controllers/widgetController.js";

const router = express.Router();

router.post("/add", createWidget);
router.get("/all", getWidgets);
router.delete("/:id", deleteWidget);

export default router;
