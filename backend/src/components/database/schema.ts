import {
    pgTable,
    integer,
    varchar,
    timestamp,
    pgEnum,
    boolean,
} from "drizzle-orm/pg-core";

export enum Status {
    TODO = "to_do",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
}

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 16 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    password_hash: varchar({ length: 255 }).notNull(),
    created_at: timestamp().notNull().defaultNow(),
    last_updated_at: timestamp().notNull().defaultNow(),
});

export const projectsTable = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    created_by: integer()
        .notNull()
        .references(() => usersTable.id),
    created_at: timestamp().notNull().defaultNow(),
    last_updated_at: timestamp().notNull().defaultNow(),
});

export const onboardingsTable = pgTable("onboardings", {
    project_id: integer()
        .notNull()
        .references(() => projectsTable.id),
    user_id: integer()
        .notNull()
        .references(() => usersTable.id),
    created_at: timestamp().notNull().defaultNow(),
    last_updated_at: timestamp().notNull().defaultNow(),
});

export const todosTable = pgTable("todos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    created_by: integer()
        .notNull()
        .references(() => usersTable.id),
    project_id: integer()
        .notNull()
        .references(() => projectsTable.id),
    status: pgEnum("status", [
        Status.TODO,
        Status.IN_PROGRESS,
        Status.COMPLETED,
    ])()
        .notNull()
        .default(Status.TODO),
    created_at: timestamp().notNull().defaultNow(),
    last_updated_at: timestamp().notNull().defaultNow(),
});

export const assignmentsTable = pgTable("assignments", {
    todo_id: integer()
        .notNull()
        .references(() => todosTable.id),
    user_id: integer()
        .notNull()
        .references(() => usersTable.id),
    created_at: timestamp().notNull().defaultNow(),
    last_updated_at: timestamp().notNull().defaultNow(),
});

export const commentsTable = pgTable("comments", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    todo_id: integer()
        .notNull()
        .references(() => todosTable.id),
    user_id: integer()
        .notNull()
        .references(() => usersTable.id),
    content: varchar({ length: 255 }).notNull(),
    created_at: timestamp().notNull().defaultNow(),
    last_updated_at: timestamp().notNull().defaultNow(),
});

export const notificationsTable = pgTable("notifications", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer()
        .notNull()
        .references(() => usersTable.id),
    title: varchar({ length: 255 }).notNull(),
    content: varchar({ length: 255 }).notNull(),
    href: varchar({ length: 1000 }).notNull(),
    read: boolean().notNull().default(false),
    created_at: timestamp().notNull().defaultNow(),
    last_updated_at: timestamp().notNull().defaultNow(),
});
