import { userController } from "components/controllers";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", async (req, res, next) => {
    await userController.signup({ req, res, next });
});

userRouter.post("/login", async (req, res, next) => {
    await userController.login({ req, res, next });
});

export { userRouter };
