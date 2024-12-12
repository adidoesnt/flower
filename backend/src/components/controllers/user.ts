import { createInsertSchema } from "drizzle-zod";
import type { ControllerProps } from "./types";
import { usersTable } from "components/database/schema";
import { userService } from "components/services";
import type { ResponseError } from "components/middleware/error";
import { RES } from "constants/response";

const { CREATED, BAD_REQUEST } = RES;

const userInsertSchema = createInsertSchema(usersTable);

export const signup = async ({ req, res, next }: ControllerProps) => {
    try {
        const attributes = userInsertSchema.parse(req.body);
        const user = await userService.signup(attributes);
        return res.status(CREATED.CODE).json(user);
    } catch (e) {
        const error = e as ResponseError;
        error.status = BAD_REQUEST.CODE;
        next(error);
    }
};
