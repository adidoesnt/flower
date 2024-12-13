import { projectRepository } from "components/repositories";
import type { Project } from "components/repositories/project";

export const createProject = async (params: Project) => {
    const project = await projectRepository.createOne(params);
    return project;
};
