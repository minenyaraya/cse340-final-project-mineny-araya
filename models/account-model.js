import pool from "../database/db-connection.js";

const accountModel = {
  registerAccount: async function (
    firstname,
    lastname,
    email,
    password,
    initialInvestment,
    loanAmount,
    houseType,
  ) {
    try {
      const sql = `INSERT INTO public.account 
        (account_firstname, account_lastname, account_email, account_password, initial_investment, loan_amount, house_type, account_type, loan_status) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'Client', 'Pending') RETURNING *`;
      const result = await pool.query(sql, [
        firstname,
        lastname,
        email,
        password,
        initialInvestment,
        loanAmount,
        houseType,
      ]);
      return result.rows;
    } catch (error) {
      return error.message;
    }
  },

  loginAccount: async function (email) {
    try {
      const sql = "SELECT * FROM public.account WHERE account_email = $1";
      const result = await pool.query(sql, [email]);
      return result.rows[0];
    } catch (error) {
      return error.message;
    }
  },

  getAllAccounts: async function () {
    try {
      const sql = "SELECT * FROM public.account ORDER BY account_lastname ASC";
      const result = await pool.query(sql);
      return result.rows;
    } catch (error) {
      return error.message;
    }
  },
};

export default accountModel;
