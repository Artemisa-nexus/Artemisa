import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin123',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'artemisa',
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});

export { pool };

// Function to test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(" Connection to the database successful");
    connection.release();
  } catch (error) {
    console.error(" Error connecting to the database", error.message);
  }
}

testConnection();