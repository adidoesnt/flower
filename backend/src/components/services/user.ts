import { userRepository } from "components/repositories";
import type { User } from "components/repositories/user";
import { SALT_ROUNDS } from "constants/hash";

export const signup = async (params: User) => {
    const { password, ...rest } = params;

    const passwordHash = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: Number(SALT_ROUNDS),
    });

    const user = { ...rest, password: passwordHash };

    return await userRepository.createOne(user);
};
