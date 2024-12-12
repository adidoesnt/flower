import { Router } from "express";
import { RES } from "constants/response";

export const healthRouter = Router();

healthRouter.get("/", (req, res) => {
    res.status(RES.OK.CODE).json({
        status: RES.OK.MESSAGE,
    });
});
