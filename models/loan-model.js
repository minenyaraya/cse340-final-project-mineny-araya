import pool from "../database/db-connection.js";

async function createLoanApplication(user_id, loan_amount, loan_purpose) {
  try {
    const sql =
      "INSERT INTO public.loans (user_id, loan_amount, loan_purpose, loan_status) VALUES ($1, $2, $3, 'Submitted') RETURNING *";
    return await pool.query(sql, [user_id, loan_amount, loan_purpose]);
  } catch (error) {
    return error.message;
  }
}

async function getLoansByUserId(user_id) {
  try {
    const sql =
      "SELECT * FROM public.loans WHERE user_id = $1 ORDER BY created_at DESC";
    const data = await pool.query(sql, [user_id]);
    return data.rows;
  } catch (error) {
    return error.message;
  }
}

async function getAllLoans() {
  try {
    const sql = `SELECT l.*, u.user_first_name, u.user_last_name 
                 FROM public.loans l 
                 JOIN public.users u ON l.user_id = u.user_id 
                 ORDER BY l.created_at DESC`;
    const data = await pool.query(sql);
    return data.rows;
  } catch (error) {
    return error.message;
  }
}

async function updateLoanStatus(loan_id, loan_status) {
  try {
    const sql =
      "UPDATE public.loans SET loan_status = $1 WHERE loan_id = $2 RETURNING *";
    const result = await pool.query(sql, [loan_status, loan_id]);
    return result.rows;
  } catch (error) {
    return error.message;
  }
}

export default {
  createLoanApplication,
  getLoansByUserId,
  getAllLoans,
  updateLoanStatus,
};
