import { db } from "components/database";
import { usersTable } from "components/database/schema";
import { eq, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export type User = InferInsertModel<typeof usersTable>;
export type UserFindAttributes = Pick<
    InferSelectModel<typeof usersTable>,
    "id" | "username" | "email" | "created_at" | "last_updated_at"
>;

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

export const findOneByUsername = async (username: string) => {
    const users = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, username));

    const user = users?.pop();
    return user;
};
