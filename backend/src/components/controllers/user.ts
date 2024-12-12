import { createInsertSchema } from "drizzle-zod";
import type { ControllerProps } from "./types";
import { usersTable } from "components/database/schema";
import { userService } from "components/services";
import type { ResponseError } from "components/middleware/error";

const userInsertSchema = createInsertSchema(usersTable);

export const signup = async ({ req, res, next }: ControllerProps) => {
    try {
        const user = userInsertSchema.parse(req.body);
        await userService.signup(user);
    } catch (e) {
        const error = e as ResponseError;
        error.status = 400;
        next(error);
    }
};
