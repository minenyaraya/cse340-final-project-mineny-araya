import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

/**
 * Connection Pool for Neny Home Loans Database
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
