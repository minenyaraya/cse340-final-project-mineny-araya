import pool from "../database/db-connection.js";
const baseController = {};

baseController.buildHome = async function (req, res) {
  try {
    const result = await pool.query("SELECT NOW()"); // Prueba la conexión real
    console.log("Database connected at:", result.rows[0].now);
    res.render("index", { title: "Home" });
  } catch (error) {
    console.error("Database error:", error);
    res.render("index", { title: "Home - DB Offline" });
  }
};
baseController.buildRegister = async function (req, res) {
  res.render("register", { title: "Join Neny Loans" });
};

export default baseController;
