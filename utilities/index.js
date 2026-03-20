import loanModel from "../models/loan-model.js";
const Util = {};

Util.getNav = async function () {
  let list = '<li><a href="/" title="Home page">Home</a></li>';
  list +=
    '<li><a href="/loans/apply" title="Apply for a loan">Apply for Loan</a></li>';

  return list;
};

Util.checkLogin = (req, res, next) => {
  if (req.session && req.session.loggedin) {
    next();
  } else {
    req.flash("notice", "Please log in.");
    return res.redirect("/account/login");
  }
};

export default Util;
