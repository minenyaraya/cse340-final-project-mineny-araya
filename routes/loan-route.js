import express from "express";
const router = express.Router();
import loanCont from "../controllers/loan-controller.js";
import validate from "../middleware/account-validation.js";

router.get("/apply", validate.clientCheck, loanCont.buildLoanApplication);
router.post("/apply", validate.clientCheck, loanCont.processApplication);

router.get("/management", validate.adminCheck, loanCont.buildManagement);
router.post("/update-status", validate.adminCheck, loanCont.updateStatus);

export default router;
