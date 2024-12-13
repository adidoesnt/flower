import { createInsertSchema } from "drizzle-zod";
import type { ControllerProps } from "./types";
import { usersTable } from "components/database/schema";
import { userService } from "components/services";
import type { ResponseError } from "components/middleware/error";
import { RES } from "constants/response";
import { z } from "zod";

const { CREATED, BAD_REQUEST, OK } = RES;

const userInsertSchema = createInsertSchema(usersTable);
const userLoginSchema = z.object({
    username: z.string().trim(),
    password: z.string().trim(),
});

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

export const login = async ({ req, res, next }: ControllerProps) => {
    try {
        const { username, password } = userLoginSchema.parse(req.body);

        const { token, ...user } = await userService.login({
            username,
            password,
        });
        return res.cookie("token", token).status(OK.CODE).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout = async ({ req, res, next }: ControllerProps) => {
    const token = req.cookies.token;

    try {
        await userService.logout(token);
        return res.clearCookie("token").status(OK.CODE).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        next(error);
    }
};
