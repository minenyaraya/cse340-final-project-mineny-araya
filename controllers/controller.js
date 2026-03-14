import pool from "../database/db-connection.js";
import accountModel from "../models/account-model.js";
import Util from "../utilities/index.js";

const controllers = {};

controllers.buildHome = async function (req, res) {
  const nav = await Util.getNav();
  res.render("index", { title: "Home", nav });
};

controllers.buildRegister = async function (req, res) {
  const nav = await Util.getNav();
  res.render("register", { title: "Join Neny Loans", nav });
};

controllers.buildLogin = async function (req, res) {
  const nav = await Util.getNav();
  res.render("login", { title: "Login", nav });
};

controllers.getClassifications = async function (req, res) {
  const nav = await Util.getNav();
  res.render("inventory", { title: "Inventory List", nav });
};

controllers.registerUser = async function (req, res) {
  let nav = await Util.getNav();
  try {
    const {
      account_firstname,
      account_lastname,
      account_email,
      account_password,
    } = req.body;

    await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      account_password,
    );

    res.render("index", { title: "Home", nav });
  } catch (error) {
    console.error("Registration error:", error);
    res.render("register", { title: "Registration Failed", nav });
  }
};

export default controllers;
