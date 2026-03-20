import express from "express";
const router = new express.Router();
import loanCont from "../controllers/loan-controller.js";
import utilities from "../utilities/index.js";

router.get("/apply", utilities.checkLogin, loanCont.buildLoanApplication);
router.post("/apply", utilities.checkLogin, loanCont.processApplication);

export default router;
