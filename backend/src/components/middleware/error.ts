import type { NextFunction, Request, Response } from "express";
import type { ZodIssue } from "zod";

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
    const status = error.status ?? 500;
    return res.status(status).json({ error: error.issues ?? error.message });
};
