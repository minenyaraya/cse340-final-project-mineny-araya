import pool from "../database/db-connection.js";

async function createLoanApplication(
  user_id,
  loan_amount,
  initial_investment,
  house_type,
) {
  try {
    const sql =
      "UPDATE public.users SET loan_amount = $1, initial_investment = $2, house_type = $3, loan_status = 'Pending' WHERE user_id = $4 RETURNING *";
    const result = await pool.query(sql, [
      loan_amount,
      initial_investment,
      house_type,
      user_id,
    ]);
    return result.rows[0];
  } catch (error) {
    return error.message;
  }
}

async function getAllLoans() {
  try {
    const sql =
      "SELECT * FROM public.users WHERE user_role = 'Client' ORDER BY user_last_name ASC";
    const data = await pool.query(sql);
    return data.rows;
  } catch (error) {
    return error.message;
  }
}

async function updateLoanStatus(user_id, loan_status) {
  try {
    const sql =
      "UPDATE public.users SET loan_status = $1 WHERE user_id = $2 RETURNING *";
    const result = await pool.query(sql, [loan_status, user_id]);
    return result.rows[0];
  } catch (error) {
    return error.message;
  }
}

export default {
  createLoanApplication,
  getAllLoans,
  updateLoanStatus,
};
