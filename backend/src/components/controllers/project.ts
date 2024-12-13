import { createInsertSchema } from "drizzle-zod";
import type { ControllerProps } from "./types";
import { projectsTable } from "components/database/schema";
import { projectService } from "components/services";
import { RES } from "constants/response";

const { CREATED } = RES;

const projectInsertSchema = createInsertSchema(projectsTable);

export const createProject = async ({ req, res, next }: ControllerProps) => {
    try {
        const attributes = projectInsertSchema.parse(req.body);
        const project = await projectService.createProject(attributes);

        return res.status(CREATED.CODE).json(project);
    } catch (error) {
        next(error);
    }
};
