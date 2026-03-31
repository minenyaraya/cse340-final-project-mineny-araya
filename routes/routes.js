import express from "express";
const router = express.Router();
import controllers from "../controllers/controller.js";
import validate from "../middleware/account-validation.js";

router.get("/", controllers.buildHome);

router.get("/register", controllers.buildRegister);
router.post(
  "/register",
  validate.registrationRules(),
  validate.checkRegistrationData,
  controllers.registerUser,
);

router.get("/login", controllers.buildLogin);
router.post("/login", controllers.loginUser);

router.get("/logout", controllers.logoutUser);

router.get("/client", validate.clientCheck, controllers.buildClient);

router.post(
  "/update-status",
  validate.adminCheck,
  controllers.updateLoanStatus,
);

export default router;
