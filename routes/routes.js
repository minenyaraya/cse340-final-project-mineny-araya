import express from "express";
const router = new express.Router();
import baseController from "../controllers/controller.js";

router.get("/", baseController.buildHome);

export default router;
