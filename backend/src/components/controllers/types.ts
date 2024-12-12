import type { Request, Response, NextFunction } from "express";

export type ControllerProps = {
    req: Request;
    res: Response;
    next: NextFunction;
};
