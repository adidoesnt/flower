import type { NextFunction, Request, Response } from "express";

export type ResponseError = Error & {
    status: number;
};

export const handleError = (
    _req: Request,
    res: Response,
    _next: NextFunction,
    e: Error
) => {
    const error = e as ResponseError;
    const status = error.status ?? 500;
    return res.status(status).json({ error: error.message });
};
