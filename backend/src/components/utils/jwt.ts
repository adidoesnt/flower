import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "constants/jwt";
import type { UserFindAttributes } from "components/repositories/user";
import type { ResponseError } from "components/middleware/error";
import { RES } from "constants/response";

export const generateToken = (
    payload: Pick<UserFindAttributes, "id" | "username" | "email">
) => {
    if (!JWT_SECRET) {
        const error: ResponseError = new Error("JWT_SECRET is not set");
        error.status = RES.INTERNAL_SERVER_ERROR.CODE;
        throw error;
    }

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};
