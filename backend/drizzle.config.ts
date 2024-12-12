import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { DB_URL } from "constants/database";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/components/database/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: DB_URL,
    },
});
