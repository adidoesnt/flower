import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 16 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    password_hash: varchar({ length: 255 }).notNull(),
    created_at: timestamp().notNull().defaultNow(),
    last_updated_at: timestamp().notNull().defaultNow(),
});
