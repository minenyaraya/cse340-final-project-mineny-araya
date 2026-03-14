import pool from "../database/db-connection.js";

const accountModel = {
  registerAccount: async function (firstname, lastname, email, password) {
    try {
      const sql = `INSERT INTO public.users 
        (user_first_name, user_last_name, user_email, user_password, user_role) 
        VALUES ($1, $2, $3, $4, 'Client') RETURNING *`;

      return await pool.query(sql, [firstname, lastname, email, password]);
    } catch (error) {
      console.error("Error en el SQL:", error);
      return error.message;
    }
  },
};

export default accountModel;
