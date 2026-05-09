const { Pool } = require("pg");
require("dotenv").config();

const client = new Pool({
  host: "aws-1-ap-south-1.pooler.supabase.com",
  port: 6543,
  user: "postgres.xeqsjarbfcbjrexfmlaz",
  password: process.env.password,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((error) => {
    console.log("Database connection failed:", error.message);
  });

module.exports = client;