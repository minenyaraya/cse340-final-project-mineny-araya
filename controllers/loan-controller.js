import loanModel from "../models/loan-model.js";
import utilities from "../utilities/index.js";

const loanCont = {};

loanCont.buildLoanApplication = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("loans/apply", {
    title: "Apply for a Home Loan",
    nav,
    errors: null,
  });
};

loanCont.processApplication = async function (req, res) {
  let nav = await utilities.getNav();
  const { loan_amount, loan_purpose } = req.body;
  const account_id = res.locals.accountData.account_id;

  const result = await loanModel.createLoanApplication(
    account_id,
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
    });
  }
};

export default loanCont;
