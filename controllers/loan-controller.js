import loanModel from "../models/loan-model.js";
import utilities from "../utilities/index.js";

const loanCont = {};

loanCont.buildLoanApplication = async function (req, res, next) {
  let nav = await utilities.getNav(
    req.session.loggedin,
    req.session.accountData,
  );
  res.render("loans/apply", {
    title: "Apply for a Home Loan",
    nav,
    errors: null,
    initial_investment: "",
    loan_amount: "",
    house_type: "",
  });
};

loanCont.processApplication = async function (req, res) {
  let nav = await utilities.getNav(
    req.session.loggedin,
    req.session.accountData,
  );
  const { initial_investment, loan_amount, house_type } = req.body;
  const user_id = req.session.accountData.user_id;

  const result = await loanModel.createLoanApplication(
    user_id,
    loan_amount,
    initial_investment,
    house_type,
  );

  if (result) {
    req.flash("notice", "Application submitted successfully.");
    res.status(201).redirect("/client");
  } else {
    req.flash("notice", "Sorry, the application failed.");
    res.status(501).render("loans/apply", {
      title: "Apply for a Home Loan",
      nav,
      errors: null,
      initial_investment,
      loan_amount,
      house_type,
    });
  }
};

loanCont.buildManagement = async function (req, res) {
  let nav = await utilities.getNav(
    req.session.loggedin,
    req.session.accountData,
  );
  const allAccounts = await loanModel.getAllLoans();
  res.render("client", {
    title: "Loan Management Dashboard",
    nav,
    accountData: req.session.accountData,
    allAccounts,
  });
};

loanCont.updateStatus = async function (req, res) {
  const { user_id, loan_status } = req.body;
  await loanModel.updateLoanStatus(user_id, loan_status);
  req.flash("notice", "Status updated successfully.");
  res.redirect("/client");
};

export default loanCont;
