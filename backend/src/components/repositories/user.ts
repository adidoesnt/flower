import { db } from "components/database";
import { usersTable } from "components/database/schema";
import type { InferInsertModel } from "drizzle-orm";

export type User = InferInsertModel<typeof usersTable>;

export const createOne = async (user: User) => {
    await db.insert(usersTable).values(user);
};
