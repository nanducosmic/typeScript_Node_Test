import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL; // <-- use the public URL here

const pool = new Pool({
  connectionString, 
  ssl: { rejectUnauthorized: false } // required for Railway / some cloud DBs
});

export default pool;
