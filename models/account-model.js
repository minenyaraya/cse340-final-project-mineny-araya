import pool from "../database/db-connection.js";

const accountModel = {
  registerAccount: async function (
    firstname,
    lastname,
    email,
    password,
    investment,
    loan,
    house,
  ) {
    try {
      const sql =
        "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type, initial_investment, loan_amount, house_type, loan_status) VALUES ($1, $2, $3, $4, 'Client', $5, $6, $7, 'Pending') RETURNING *";
      const result = await pool.query(sql, [
        firstname,
        lastname,
        email,
        password,
        investment,
        loan,
        house,
      ]);
      return result.rows[0];
    } catch (error) {
      return error.message;
    }
  },

  loginAccount: async function (email) {
    try {
      const sql = "SELECT * FROM account WHERE account_email = $1";
      const result = await pool.query(sql, [email]);
      return result.rows[0];
    } catch (error) {
      return error.message;
    }
  },

  getAllAccounts: async function () {
    try {
      const sql = "SELECT * FROM account ORDER BY account_lastname ASC";
      const result = await pool.query(sql);
      return result.rows;
    } catch (error) {
      return error.message;
    }
  },

  updateLoanStatus: async function (accountId, status) {
    try {
      const sql =
        "UPDATE account SET loan_status = $1 WHERE account_id = $2 RETURNING *";
      const result = await pool.query(sql, [status, accountId]);
      return result.rows[0];
    } catch (error) {
      return error.message;
    }
  },
};

export default accountModel;
