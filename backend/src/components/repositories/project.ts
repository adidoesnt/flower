import { db } from "components/database";
import { projectsTable } from "components/database/schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Project = InferInsertModel<typeof projectsTable>;
export type ProjectFindAttributes = Pick<
    InferSelectModel<typeof projectsTable>,
    "id" | "name"
>;

export const createOne = async (project: Project) => {
    const projects = await db.insert(projectsTable).values(project).returning();
    const createdProject = projects?.pop();
    return createdProject;
};
