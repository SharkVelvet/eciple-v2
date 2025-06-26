import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../shared/schema.js";

// Create connection pool
const pool = new Pool({
  connectionString: "postgres://silverfish:tS4=uY3+aB3=lF8=zO1=@uncomfortable-coffee-bison-467dg-postgresql.services.clever-cloud.com:50013/uncomfortable-coffee-bison",
  ssl: {
    rejectUnauthorized: false
  }
});

export const db = drizzle(pool, { schema });

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Successfully connected to PostgreSQL database');
    release();
  }
});