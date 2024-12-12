import type { NextFunction, Request, Response } from "express";
import { RES } from "constants/response";
import { decodeToken } from "components/utils/jwt";
import type { ResponseError } from "./error";

export const authorise = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        const error: ResponseError = new Error("Token is not set");
        error.status = RES.UNAUTHORIZED.CODE;
        return next(error);
    }

    try {
        const user = decodeToken(token);
        res.locals.user = user;
    } catch (e) {
        const error = e as ResponseError;
        error.status = RES.FORBIDDEN.CODE;
        return next(error);
    }

    next();
};
