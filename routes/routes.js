import express from "express";
import controllers from "../controllers/controller.js";
import { clientCheck } from "../middleware/clientCheck.js";
import utilities from "../utilities/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const nav = await utilities.getNav();
  res.render("index", {
    title: "Home",
    nav,
  });
});

router.get("/register", controllers.buildRegister);
router.post("/register", controllers.registerUser);

router.get("/login", controllers.buildLogin);
router.post("/login", controllers.loginUser);
router.get("/client", clientCheck, controllers.buildClient);

export default router;
