import express from "express";
const router = new express.Router();
import controllers from "../controllers/controller.js";

router.get("/", controllers.buildHome);
router.get("/register", controllers.buildRegister);
router.get("/inventory", controllers.getClassifications);

router.post("/register", controllers.registerUser);

export default router;
