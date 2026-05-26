import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as userSchema from "./schema/user";
import * as categorySchema from "./schema/category";
import * as productSchema from "./schema/product";
import * as leadSchema from "./schema/lead";

const schema = {
  ...userSchema,
  ...categorySchema,
  ...productSchema,
  ...leadSchema,
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL variable environment is not defined.");
}

// For serverless or connection pooling (Neon), prepare: false is recommended to avoid prepared statement issues.
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
export type Database = typeof db;
