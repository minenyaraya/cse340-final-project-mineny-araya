import pool from "../database/db-connection.js";

const inventoryModel = {};

inventoryModel.getClassifications = async function () {
  try {
    const sql =
      "SELECT * FROM public.classification ORDER BY classification_name ASC";
    const data = await pool.query(sql);
    return data.rows;
  } catch (error) {
    return error.message;
  }
};

export default inventoryModel;
