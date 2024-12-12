import { createInsertSchema } from "drizzle-zod";
import type { ControllerProps } from "./types";
import { usersTable } from "components/database/schema";
import { ZodError } from "zod";
import { userService } from "components/services";

const userInsertSchema = createInsertSchema(usersTable);

export const signup = async ({ req, res, next }: ControllerProps) => {
    try {
        const user = userInsertSchema.parse(req.body);
        await userService.signup(user);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ error: error.issues });
        } else {
            next(error);
        }
    }
};
