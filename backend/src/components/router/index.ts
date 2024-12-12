import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";
import { healthRouter } from "./health";
import { userRouter } from "./user";
import { handleError } from "components/middleware/error";

const router = Router();

router.use("/health", healthRouter);
router.use("/users", userRouter);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(err, req, res, next);
});

export { router };
