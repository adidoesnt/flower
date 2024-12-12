import { userController } from "components/controllers";
import { authorise } from "components/middleware/auth";
import { handleError } from "components/middleware/error";
import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";

const userRouter = Router();

userRouter.post("/signup", async (req, res, next) => {
    await userController.signup({ req, res, next });
});

userRouter.post("/login", async (req, res, next) => {
    await userController.login({ req, res, next });
});

userRouter.use(authorise);

userRouter.post("/logout", async (req, res, next) => {
    await userController.logout({ req, res, next });
});

export { userRouter };
