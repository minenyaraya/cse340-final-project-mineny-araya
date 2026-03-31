import { body, validationResult } from "express-validator";
import Util from "../utilities/index.js";

const validate = {};

validate.registrationRules = () => {
  return [
    body("user_first_name").trim().notEmpty(),
    body("user_last_name").trim().notEmpty(),
    body("user_email").isEmail().normalizeEmail(),
    body("user_password").trim().notEmpty().isLength({ min: 5 }),
    body("initial_investment").isNumeric(),
    body("loan_amount").isNumeric(),
    body("house_type").isIn(["new", "used", "refinance"]),
  ];
};

validate.checkRegistrationData = async (req, res, next) => {
  const {
    user_first_name,
    user_last_name,
    user_email,
    initial_investment,
    loan_amount,
    house_type,
  } = req.body;
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await Util.getNav(req.session.loggedin, req.session.accountData);
    res.render("register", {
      errors: errors.array(),
      title: "Registration",
      nav,
      user_first_name,
      user_last_name,
      user_email,
      initial_investment,
      loan_amount,
      house_type,
    });
    return;
  }
  next();
};

validate.clientCheck = (req, res, next) => {
  if (req.session.loggedin && req.session.accountData) {
    next();
  } else {
    return res.redirect("/login");
  }
};

validate.adminCheck = (req, res, next) => {
  if (
    req.session.loggedin &&
    req.session.accountData &&
    (req.session.accountData.account_type === "Admin" ||
      req.session.accountData.account_type === "Loan Manager")
  ) {
    next();
  } else {
    req.flash("notice", "Access denied. Only Admins or Managers allowed.");
    return res.redirect("/client");
  }
};

export default validate;
