import pool from "../database/db-connection.js";

async function createLoanApplication(account_id, loan_amount, loan_purpose) {
  try {
    const sql =
      "INSERT INTO public.loans (account_id, loan_amount, loan_purpose, loan_status) VALUES ($1, $2, $3, 'Submitted') RETURNING *";
    return await pool.query(sql, [account_id, loan_amount, loan_purpose]);
  } catch (error) {
    return error.message;
  }
}

async function getLoansByAccountId(account_id) {
  try {
    const sql =
      "SELECT * FROM public.loans WHERE account_id = $1 ORDER BY created_at DESC";
    const data = await pool.query(sql, [account_id]);
    return data.rows;
  } catch (error) {
    return error.message;
  }
}

export default { createLoanApplication, getLoansByAccountId };
