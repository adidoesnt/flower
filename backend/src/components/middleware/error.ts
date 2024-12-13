import { RES } from "constants/response";
import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodIssue } from "zod";

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = RES;

export type ResponseError = Error & {
    status?: number;
    issues?: ZodIssue[];
};

export const handleError = (
    e: Error,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!e) return next();

    const error = e as ResponseError;

    if (e instanceof ZodError) {
        error.status = BAD_REQUEST.CODE;
    }

    const status = error.status ?? INTERNAL_SERVER_ERROR.CODE;
    return res.status(status).json({ error: error.issues ?? error.message });
};
