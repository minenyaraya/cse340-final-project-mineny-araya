import loanModel from "../models/loan-model.js";
import utilities from "../utilities/index.js";

const loanCont = {};

loanCont.buildLoanApplication = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("loans/apply", {
    title: "Apply for a Home Loan",
    nav,
    errors: null,
    loan_amount: "",
    loan_purpose: "",
  });
};

loanCont.processApplication = async function (req, res) {
  let nav = await utilities.getNav();
  const { loan_amount, loan_purpose } = req.body;

  const user_id = req.session.accountData.user_id;

  const result = await loanModel.createLoanApplication(
    user_id,
    loan_amount,
    loan_purpose,
  );

  if (result) {
    req.flash("notice", "Application submitted successfully.");
    res.status(201).render("loans/success", {
      title: "Success",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the application failed.");
    res.status(501).render("loans/apply", {
      title: "Apply for a Home Loan",
      nav,
      errors: null,
      loan_amount,
      loan_purpose,
    });
  }
};

loanCont.buildManagement = async function (req, res) {
  let nav = await utilities.getNav();
  const loans = await loanModel.getAllLoans();
  res.render("loans/management", {
    title: "Loan Management Dashboard",
    nav,
    loans,
    errors: null,
  });
};

loanCont.updateStatus = async function (req, res) {
  const { loan_id, loan_status } = req.body;
  await loanModel.updateLoanStatus(loan_id, loan_status);
  req.flash("notice", "Status updated successfully.");
  res.redirect("/loans/management");
};

export default loanCont;
