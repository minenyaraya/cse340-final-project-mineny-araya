import bcrypt from "bcryptjs";
import accountModel from "../models/account-model.js";
import Util from "../utilities/index.js";

const controllers = {};

controllers.buildHome = async function (req, res) {
  const nav = await Util.getNav(req.session.loggedin);
  res.render("index", { title: "Home", nav });
};

controllers.buildRegister = async function (req, res) {
  const nav = await Util.getNav(req.session.loggedin);
  res.render("register", { title: "Register", nav, errors: null });
};

controllers.buildLogin = async function (req, res) {
  const nav = await Util.getNav(req.session.loggedin);
  res.render("login", { title: "Login", nav, errors: null });
};

controllers.registerUser = async function (req, res) {
  const {
    user_first_name,
    user_last_name,
    user_email,
    user_password,
    initial_investment,
    loan_amount,
    house_type,
  } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hashSync(user_password, 10);
  } catch (error) {
    req.flash("notice", "Error encrypting password.");
    return res.status(500).redirect("/register");
  }

  const regResult = await accountModel.registerAccount(
    user_first_name,
    user_last_name,
    user_email,
    hashedPassword,
    initial_investment,
    loan_amount,
    house_type,
  );

  if (regResult) {
    req.flash("notice", "Registration successful. Please log in.");
    res.status(201).redirect("/login");
  } else {
    req.flash("notice", "Registration failed.");
    res.status(500).redirect("/register");
  }
};

controllers.loginUser = async function (req, res) {
  const { user_email, user_password } = req.body;
  const accountData = await accountModel.loginAccount(user_email);

  if (!accountData) {
    req.flash("notice", "Email not found.");
    return res.status(400).redirect("/login");
  }

  try {
    if (await bcrypt.compare(user_password, accountData.user_password)) {
      delete accountData.user_password;
      req.session.accountData = accountData;
      req.session.loggedin = true;
      return res.redirect("/");
    } else {
      req.flash("notice", "Wrong password.");
      return res.status(400).redirect("/login");
    }
  } catch (error) {
    req.flash("notice", "Login error.");
    return res.status(500).redirect("/login");
  }
};

controllers.buildClient = async function (req, res) {
  const nav = await Util.getNav(req.session.loggedin);
  res.render("client", { title: "Client", nav });
};

controllers.logoutUser = async function (req, res) {
  req.session.destroy();
  res.clearCookie("connect.sid");
  return res.redirect("/");
};

export default controllers;
