import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";
import { healthRouter } from "./health";
import { userRouter } from "./user";
import { handleError } from "components/middleware/error";
import { authorise } from "components/middleware/auth";
import { projectRouter } from "./project";

const router = Router();

router.use("/health", healthRouter);
router.use("/users", userRouter);

router.use(authorise);

router.use("/projects", projectRouter);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(err, req, res, next);
});

export { router };
