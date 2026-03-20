import bcrypt from "bcryptjs";
import accountModel from "../models/account-model.js";
import Util from "../utilities/index.js";

const controllers = {};

controllers.buildHome = async function (req, res) {
  const nav = await Util.getNav();
  res.render("index", { title: "Home", nav });
};

controllers.buildRegister = async function (req, res) {
  const nav = await Util.getNav();
  res.render("register", { title: "Register", nav, errors: null });
};

controllers.buildLogin = async function (req, res) {
  const nav = await Util.getNav();
  res.render("login", { title: "Login", nav, errors: null });
};

controllers.registerUser = async function (req, res) {
  const { user_first_name, user_last_name, user_email, user_password } =
    req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hashSync(user_password, 10);
  } catch (error) {
    return res.status(500).send("Error encrypting password");
  }

  const regResult = await accountModel.registerAccount(
    user_first_name,
    user_last_name,
    user_email,
    hashedPassword,
  );

  if (regResult) {
    const nav = await Util.getNav();
    res.render("login", { title: "Login", nav, errors: null });
  } else {
    res.status(500).send("Registration failed");
  }
};

controllers.loginUser = async function (req, res) {
  const { user_email, user_password } = req.body;
  const accountData = await accountModel.loginAccount(user_email);

  if (!accountData) {
    return res.status(400).send("Email not found");
  }

  try {
    if (await bcrypt.compare(user_password, accountData.user_password)) {
      delete accountData.user_password;
      req.session.accountData = accountData;
      req.session.loggedin = true;
      return res.redirect("/");
    } else {
      return res.status(400).send("Wrong password");
    }
  } catch (error) {
    return res.status(500).send("Login error");
  }
};

controllers.buildClient = async function (req, res) {
  const nav = await Util.getNav();
  res.render("client", { title: "Client", nav });
};

export default controllers;
