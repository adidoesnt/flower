import { DB_URL } from "constants/database";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(DB_URL);
