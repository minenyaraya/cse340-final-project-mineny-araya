import express from "express";
const router = new express.Router();
import loanCont from "../controllers/loan-controller.js";
import validate from "../middleware/account-validation.js";

router.get("/apply", validate.checkLogin, loanCont.buildLoanApplication);
router.post("/apply", validate.checkLogin, loanCont.processApplication);

router.get("/management", validate.checkLogin, loanCont.buildManagement);
router.post("/update-status", validate.checkLogin, loanCont.updateStatus);

export default router;
