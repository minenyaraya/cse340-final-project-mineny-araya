import pool from "../database/db-connection.js";

const accountModel = {
  registerAccount: async function (firstname, lastname, email, password) {
    try {
      const sql = `INSERT INTO public.account 
        (account_firstname, account_lastname, account_email, account_password, account_type) 
        VALUES ($1, $2, $3, $4, 'Client') RETURNING *`;
      const result = await pool.query(sql, [
        firstname,
        lastname,
        email,
        password,
      ]);
      return result.rows[0];
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
};

export default accountModel;
