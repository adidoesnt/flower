import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "constants/jwt";
import type { UserFindAttributes } from "components/repositories/user";
import type { ResponseError } from "components/middleware/error";
import { RES } from "constants/response";
import cache from "components/cache";
import { v4 as uidv4 } from "uuid";

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

export const getExpiryTimestamp = (token: string) => {
    if (!JWT_SECRET) {
        const error: ResponseError = new Error("JWT_SECRET is not set");
        error.status = RES.INTERNAL_SERVER_ERROR.CODE;
        throw error;
    }

    const payload = jwt.decode(token) as JwtPayload;
    const { exp } = payload;

    if (!exp) {
        const error: ResponseError = new Error("Token is not valid");
        error.status = RES.UNAUTHORIZED.CODE;
        throw error;
    }

    const date = new Date(exp * 1000);
    return date;
};

export const decodeToken = (token: string) => {
    if (!JWT_SECRET) {
        const error: ResponseError = new Error("JWT_SECRET is not set");
        error.status = RES.INTERNAL_SERVER_ERROR.CODE;
        throw error;
    }

    return jwt.verify(token, JWT_SECRET);
};

export const generateKey = (token: string) => `token:${token}`;

export const cacheToken = async (token: string) => {
    const expiresIn = jwt.decode(token) as JwtPayload;
    const { exp } = expiresIn;

    if (!exp) {
        const error: ResponseError = new Error("Token is not valid");
        error.status = RES.UNAUTHORIZED.CODE;
        throw error;
    }

    const timeLeft = exp * 1000 - Date.now(); // Convert exp to milliseconds before subtracting

    await cache.set({
        key: generateKey(token),
        value: uidv4(),
        expiresIn: timeLeft,
    });
};
