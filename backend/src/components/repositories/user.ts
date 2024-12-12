import { db } from "components/database";
import { usersTable } from "components/database/schema";
import type { InferInsertModel } from "drizzle-orm";

export type User = InferInsertModel<typeof usersTable>;

export const createOne = async (user: User) => {
    const users = await db.insert(usersTable).values(user).returning({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        created_at: usersTable.created_at,
        last_updated_at: usersTable.last_updated_at,
    });
    const createdUser = users?.pop();
    return createdUser;
};
