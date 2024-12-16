import type { Express } from "express";
import cors from "cors";
import { FRONTEND_URL } from "constants/server";

export const setupCors = (app: Express) => {
    app.use(
        cors({
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
            origin: FRONTEND_URL,
            credentials: true,
        })
    );
};
