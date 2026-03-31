import bcrypt from "bcryptjs";
import accountModel from "../models/account-model.js";
import Util from "../utilities/index.js";

const controllers = {};

controllers.buildHome = async function (req, res) {
  const nav = await Util.getNav(req.session.loggedin, req.session.accountData);
  res.render("index", { title: "Home", nav });
};

controllers.buildRegister = async function (req, res) {
  const nav = await Util.getNav(req.session.loggedin, req.session.accountData);
  res.render("register", {
    title: "Register",
    nav,
    errors: null,
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    initial_investment: "",
    loan_amount: "",
    house_type: "",
  });
};

controllers.buildLogin = async function (req, res) {
  const nav = await Util.getNav(req.session.loggedin, req.session.accountData);
  res.render("login", { title: "Login", nav, errors: null, user_email: "" });
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
  let hashedPassword = bcrypt.hashSync(user_password, 10);
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
  let { user_email, user_password } = req.body;
  user_email = user_email.trim().toLowerCase();

  const accountData = await accountModel.loginAccount(user_email);

  if (!accountData || !accountData.account_email) {
    req.flash("notice", "Email not found.");
    return res.status(400).redirect("/login");
  }

  try {
    if (
      await bcrypt.compare(
        user_password.trim(),
        accountData.account_password.trim(),
      )
    ) {
      delete accountData.account_password;
      req.session.accountData = accountData;
      req.session.loggedin = true;
      return res.redirect("/client");
    } else {
      req.flash("notice", "Wrong password.");
      return res.status(400).redirect("/login");
    }
  } catch (error) {
    req.flash("notice", "Login error occurred.");
    return res.status(500).redirect("/login");
  }
};

controllers.buildClient = async function (req, res) {
  const nav = await Util.getNav(req.session.loggedin, req.session.accountData);
  const accountData = req.session.accountData;
  let allAccounts = null;

  if (
    accountData &&
    (accountData.account_type === "Admin" ||
      accountData.account_type === "Loan Manager")
  ) {
    allAccounts = await accountModel.getAllAccounts();
  }

  res.render("client", {
    title: "Client Dashboard",
    nav,
    accountData,
    allAccounts,
  });
};

controllers.updateLoanStatus = async function (req, res) {
  const { account_id, loan_status } = req.body;

  const updateResult = await accountModel.updateLoanStatus(
    account_id,
    loan_status,
  );

  if (updateResult) {
    req.flash("notice", "Status updated successfully.");
  } else {
    req.flash("notice", "Update failed.");
  }
  res.redirect("/client");
};

controllers.logoutUser = async function (req, res) {
  req.session.destroy();
  res.clearCookie("connect.sid");
  return res.redirect("/");
};

export default controllers;
