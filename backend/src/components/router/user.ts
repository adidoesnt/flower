import { userController } from "components/controllers";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", async (req, res, next) => {
    await userController.signup({ req, res, next });
});

export { userRouter };
