import { projectController, userController } from "components/controllers";
import { authorise } from "components/middleware/auth";
import { Router } from "express";

const projectRouter = Router();

projectRouter.post("/", async (req, res, next) => {
    await projectController.createProject({ req, res, next });
});

export { projectRouter };
