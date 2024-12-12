import type { ResponseError } from "components/middleware/error";
import { userRepository } from "components/repositories";
import type { User } from "components/repositories/user";
import { cacheToken, generateToken } from "components/utils/jwt";
import { SALT_ROUNDS } from "constants/hash";
import { RES } from "constants/response";

export const signup = async (params: User) => {
    const { password, ...rest } = params;

    const passwordHash = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: Number(SALT_ROUNDS),
    });

    const user = { ...rest, password: passwordHash };

    return await userRepository.createOne(user);
};

export const login = async ({
    username,
    password,
}: Pick<User, "username" | "password">) => {
    const user = await userRepository.findOneByUsername(username);

    if (!user) {
        const error: ResponseError = new Error("User not found");
        error.status = RES.NOT_FOUND.CODE;
        throw error;
    }

    const passwordsMatch = await Bun.password.verify(password, user.password);

    if (!passwordsMatch) {
        const error: ResponseError = new Error("Invalid password");
        error.status = RES.UNAUTHORIZED.CODE;
        throw error;
    }

    const token = generateToken(user);

    const { password: _password, ...rest } = user;
    return { ...rest, token };
};

export const logout = async (token: string) => {
    await cacheToken(token);
};
